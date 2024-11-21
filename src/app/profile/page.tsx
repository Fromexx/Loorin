'use client'

import styles from "./profile.module.scss";
import Loading from "../loading";
import { Logout } from "@/utils/helpers/Logout";
import { GetUser } from "@/api/data/user";
import { useEffect, useState } from "react";

export default function Profile() {
    const [user, SetUser] = useState(null);

    useEffect(() => {
        async function getUser() {
            SetUser(await GetUser());
        }

        getUser();
    }, []);

    if (!user) return <Loading/>;

    return (
        <div>
            <p>{user.name}</p>
            <button onClick={() => Logout()} >Logout</button>
        </div>
    )
}