'use server'

import { verifySession } from "../lib/session";
import { ConcreteUserType } from "@/utils/helpers/Types";
import { GetUserById } from "./UsersDataBaseActions";
import { AuthTypeController } from "@/utils/data/AuthType";
import { authConfig } from "../../../configs/auth";
import { getServerSession } from "next-auth";

export async function GetUser() {
    let user: ConcreteUserType = { name: null, email: null, };

    if(AuthTypeController.IsUserAuthType()) {
        const session = await verifySession();
        if(!session.userId) return null;
        user = await GetUserById(Number(session.userId));
    }
    
    else if(AuthTypeController.IsProviderAuthType()) {
        const session = await getServerSession(authConfig);
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