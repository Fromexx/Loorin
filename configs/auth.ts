import type { AuthOptions, User } from "next-auth";
import YandexProvider from "next-auth/providers/yandex";
import Credentials from "next-auth/providers/credentials";
import { Users } from "@/utils/data/Users";

export const authConfig: AuthOptions = {
    providers: [
        // YandexProvider({
        //     clientId: process.env.YANDEX_CLIENT_ID,
        //     clientSecret: process.env.YANDEX_SECRET,
        // }),
        Credentials({
            credentials: {
                email: { label: 'email', type: 'email', reqired: true },
                password: { label: 'password', type: 'password', required: true },
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials.password) return null;

                const currentUser = Users.find(user => user.email === credentials.email);

                if(currentUser && currentUser.password === credentials.password) {
                    const { password, ...userWithoutPass } = currentUser;

                    return userWithoutPass as User;
                }

                return null;
            }
        })
    ]
}