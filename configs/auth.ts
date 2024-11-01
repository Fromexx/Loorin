import type { AuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { Users } from "@/utils/data/Users";

export const authConfig: AuthOptions = {
    providers: [
        Credentials({
            credentials: {
                email: { label: 'email', type: 'email', reqired: true },
                password: { label: 'password', type: 'password', required: true },
            },
            async authorize(credentials) {
                if (credentials?.email !== "pashaignat1003@gmail.com" || credentials.password !== "123") {
                        throw new Error("Invalid email or password");
                    }

                return {
                    email: "pashaignat1003@gmail.com",
                    name: "Froms",
                    id: "test-id",
                };
            }
        })
    ]
}