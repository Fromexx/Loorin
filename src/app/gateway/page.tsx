'use client'

import { Signin } from "@/services/ProviderAuthActions";
import { useEffect } from "react";
import NotFound from "../not-found";
import Loading from "../loading";
import { isCookieSet } from "@/api/lib/authParams";

export default function Gateway() {
    useEffect(() => {
        const Actions = async () => {
            if(isCookieSet()) {
                await Signin();
            }
        }

        Actions();
    }, []);

    

    if(isCookieSet())
        return <Loading/>
    else
        return <NotFound/>
}