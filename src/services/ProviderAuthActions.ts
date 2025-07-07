'use server'

import { authConfig } from "../../configs/auth";
import { getServerSession } from "next-auth";
import { GetUserByEmail, AddUser } from "@/api/data/DataBaseActions";
import { redirect } from "next/navigation";
import { deleteAuthParams } from "@/api/lib/authParams";

export async function Signin() {
    deleteAuthParams();

    const session = await getServerSession(authConfig);
    const { name, email } = session.user;

    try {
        await AddUser(name, email);
    }
    catch(error) {
        if(error.name == "PrismaClientKnownRequestError") {
            await GetUserByEmail(email);
        }
    }

    redirect('/profile');
}