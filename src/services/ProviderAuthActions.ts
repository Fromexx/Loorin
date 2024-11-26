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
        console.log("AddUser");
        await AddUser(name, email);
    }
    catch(error) {
        console.log(error);
        if(error.name == "PrismaClientKnownRequestError") {
            console.log("Concrete error");
            await GetUserByEmail(email);
        }
    }

    redirect('/profile');
}