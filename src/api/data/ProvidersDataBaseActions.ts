export async function GetUserByEmail(email: string) {
    const client = new PrismaClient();

    const user = await client.provider.findUnique({
        where: { email },
        select: { id: true, name: true }
    });
    
    return user;
}

export async function AddUser(id: string, name: string, email: string) {
    const client = new PrismaClient();
    await client.provider.create({ data: { id: id, name: name, email: email }});
}