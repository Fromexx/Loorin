import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./api/lib/session";

export default async function middleware(request: NextRequest) {
    const protectedRoutes = ["/profile"];
    const currentPath = request.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(currentPath);

    if(isProtectedRoute) {
        const cookie = cookies().get("session")?.value;
        const session = await decrypt(cookie);

        if(!session?.userId) {
            // нужно немного переделать !!
            return NextResponse.redirect(new URL("/", request.nextUrl))
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image).*)"]
}