'use client'

import { Signin } from "@/services/ProviderAuthActions";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function Gateway() {
    useEffect(() => {
        const Actions = async () => {
            await Signin();
        }

        Actions();
    }, []);

    const { data: session, status } = useSession()

    console.log(session);
    console.log(status);

    return (
        <button onClick={() => signOut()}>Sign Out</button>
    )
}