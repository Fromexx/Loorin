'use server'

import 'server-only'
import { cookies } from "next/headers";

const AUTH_PARAMS = "authParams";

const cookie = {
    name: "authParams",
    options: { 
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
    },
    duration: 10 * 60 * 1000, // 10 min
}

export async function createAuthParams() {
    const expires = new Date(Date.now() + cookie.duration);

    cookies().set(cookie.name, AUTH_PARAMS, {
        httpOnly: true,
        secure: true,
        expires: expires,
        sameSite: 'lax',
        path: '/',
    });
}

export const IsCookieSet = async () => {
    return await verifyAuthParams() == AUTH_PARAMS;
}

export async function deleteAuthParams() {
    cookies().delete(cookie.name);
}

async function verifyAuthParams() {
    return cookies().get(cookie.name)?.value;
}