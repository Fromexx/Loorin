'use server'

import 'server-only'
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

const cookie = {
    name: "session",
    options: { 
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
    },
    duration: 24 * 60 * 60 * 1000,
}

export async function encrypt(payload: JWTPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        })
        return payload
    } 
    catch (error) {
        return null;
    }
}

export async function createSession(userId: string) {
    const expires = new Date(Date.now() + cookie.duration);
    const session = await encrypt({ userId, expires });

    cookies().set(cookie.name, session, {
            httpOnly: true,
            secure: true,
            expires: expires,
            sameSite: 'lax',
            path: '/',
        });
}

export async function verifySession() {
    const currentCookie = cookies().get(cookie.name)?.value;
    const session = await decrypt(currentCookie);

    return { userId: session?.userId };
}

export async function deleteSession() {
    cookies().delete(cookie.name);
}