import { verifySession } from "../lib/session";
import { cache } from "react";
import { ConcreteUserType } from "@/utils/helpers/Types";
import { GetUserById } from "./DataBaseActions";

export async function GetUser() {
    const session = await verifySession();
    const user = await GetUserById(session.userId.toString());

    return userDTO(user);
}

function userDTO(user: ConcreteUserType) {
    return {
        name: user.name,
        email: user.email,
    }
}