'use client'

import { Signin } from "@/services/ProviderAuthActions";
import { useEffect, useState } from "react";
import NotFound from "../not-found";
import Loading from "../loading";
import { IsCookieSet } from "@/api/lib/authParams";

export default function Gateway() {
    const [isCookieSet, setIsCookieSet] = useState(false);

    useEffect(() => {
        const Actions = async () => {
            if(await IsCookieSet()) {
                setIsCookieSet(true);
                await Signin();
            }
        }

        Actions();
    }, []);

    

    if(isCookieSet)
        return <Loading/>
    else
        return <NotFound/>
}