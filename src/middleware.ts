import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./api/lib/session";
import { AuthTypeController } from "./utils/data/AuthType";
import { getServerSession } from "next-auth";
import { authConfig } from "../configs/auth";

export default async function middleware(request: NextRequest) {
    const profileRoute = ["/profile"];
    const gatewayRoute = ["/gateway"]
    const currentPath = request.nextUrl.pathname;

    if(profileRoute.includes(currentPath)) {
        // if(AuthTypeController.IsUserAuthType()) {
        //     const cookie = cookies().get("session")?.value;
        //     const session = await decrypt(cookie);

        //     if(!session?.userId) {
        //         return NextResponse.redirect(new URL("/", request.nextUrl))
        //     }
        // }
        // else if(AuthTypeController.IsProviderAuthType()) {
        //     const session = await getServerSession(authConfig);
            
        //     if(!session.user) {
        //         return NextResponse.redirect(new URL("/", request.nextUrl))
        //     }
        // }
    }

    // else if(gatewayRoute.includes(currentPath)) {
    //     return NextResponse.rewrite(new URL("/not-found", request.url));
    // }

    return NextResponse.next();
}