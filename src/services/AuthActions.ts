'use server'

import { SignupFormSchema, SigninFormSchema, SignupFormState, SinginFormState } from "../api/lib/definitions";
import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/api/lib/session";
import { GetUserByEmail, AddUser } from "@/api/data/DataBaseActions";

export async function Signup(state: SignupFormState, formData: FormData) {
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    });

    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors }
    }

    const { name, email, password } = validatedFields.data;
    let bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash(password, 10);
    const id = Math.round(Math.random()*(10)).toString();

    let user;

    try {
        user = await AddUser(id, name, email, hashedPassword);
    }
    catch(error) {
        if(error.name == "PrismaClientKnownRequestError") {
            return { error: "Пользователь с такой почтой уже существует." }
        }
    }

    await createSession(user.id);

    redirect('/profile');
}

export async function Signin(state: SinginFormState, formData: FormData) {
    const validatedFields = SigninFormSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if(!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors }
    }

    let bcrypt = require('bcryptjs');
    const { email, password } = validatedFields.data;
    const user = await GetUserByEmail(email);

    if(user == null || !await bcrypt.compare(password, user.hashedPassword)) {
        return { incorrectDataError : "Неправильная почта или пароль." }
    }

    await createSession(user.id);

    redirect('/profile');
}

export async function Logout() {
    deleteSession();
    redirect('/');
}