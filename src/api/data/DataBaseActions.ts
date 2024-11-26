import { PrismaClient } from "@prisma/client";

export async function GetUserByEmail(email: string) {
    const client = new PrismaClient();

    const user = await client.user.findUnique({
        where: { email },
        select: { id: true, name: true, hashedPassword: true }
    });
    
    return user;
}

export async function GetUserById(id: number) {
    const client = new PrismaClient();

    const user = await client.user.findUnique({
        where: { id },
        select: { name: true, email: true }
    });
    
    return user;
}

export async function AddUser(name: string, email: string, hashedPassword?: string) {
    const client = new PrismaClient();

    return await client.user.create({ data: { name: name, email: email, hashedPassword: hashedPassword },
                                select: { id: true }});
}