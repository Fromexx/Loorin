'use server'

import { authConfig } from "../../configs/auth";
import { getServerSession } from "next-auth";
import { GetUserByEmail, AddUser } from "@/api/data/ProvidersDataBaseActions";
import { redirect } from "next/navigation";
import { AuthType, AuthTypeController } from "@/utils/data/AuthType";

export async function Signin() {
    const session = await getServerSession(authConfig);
    const { name, email } = session.user;
    const id = Math.round(Math.random()*(10)).toString();

    try {
        await AddUser(id, name, email);
    }
    catch(error) {
        if(error.name == "PrismaClientKnownRequestError") {
            GetUserByEmail(email);
        }
    }

    AuthTypeController.SetAuthType(AuthType.Provider);

    redirect('/profile');
}