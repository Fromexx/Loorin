'use server'

import { verifySession } from "../lib/session";
import { ConcreteUserType } from "@/utils/helpers/Types";
import { GetUserById } from "./DataBaseActions";
import { authConfig } from "../../../configs/auth";
import { getServerSession } from "next-auth";

export async function GetUser() {
    let user: ConcreteUserType = { name: null, email: null, };

    const session = await getServerSession(authConfig);
    if(!session) {
        const session = await verifySession();
        user = await GetUserById(Number(session.userId));
    }
    else {
        user.name = session.user.name;
        user.email = session.user.email;
    }

    return userDTO(user);
}

function userDTO(user: ConcreteUserType) {
    return {
        name: user.name,
        email: user.email,
    }
}