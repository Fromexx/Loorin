import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./api/lib/session";
import { getToken } from "next-auth/jwt";

export default async function middleware(request: NextRequest) {
    const profileRoute = ["/profile"];
    const gatewayRoute = ["/gateway"];
    const currentPath = request.nextUrl.pathname;

    if(profileRoute.includes(currentPath)) {
        const token = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET,
        });
        const cookie = cookies().get("session")?.value;
        const websiteSession = await decrypt(cookie);

        if (!token && !websiteSession?.userId) {
            return NextResponse.redirect(new URL("/", request.nextUrl));
        }
    }

    return NextResponse.next();
}