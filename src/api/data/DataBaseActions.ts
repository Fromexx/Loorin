import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool } from '@neondatabase/serverless'

export async function GetUserByEmail(email: string) {
    const neon = new Pool({ connectionString: process.env.POSTGRES_PRISMA_URL });
    const adapter = new PrismaNeon(neon);
    const prisma = new PrismaClient({ adapter });

    const user = await prisma.user.findUnique({
        where: { email },
        select: { id: true, name: true, hashedPassword: true }
    });
    
    return user;
}

export async function GetUserById(id: string) {
    const neon = new Pool({ connectionString: process.env.POSTGRES_PRISMA_URL });
    const adapter = new PrismaNeon(neon);
    const prisma = new PrismaClient({ adapter });

    const user = await prisma.user.findUnique({
        where: { id },
        select: { name: true, email: true }
    });
    
    return user;
}

export async function AddUser(id: string, name: string, email: string, hashedPassword: string) {
    const neon = new Pool({ connectionString: process.env.POSTGRES_PRISMA_URL });
    const adapter = new PrismaNeon(neon);
    const prisma = new PrismaClient({ adapter });

    let user = await prisma.user.create({ data: { id: id, name: name, email: email, hashedPassword: hashedPassword },
                                select: { id: true }});

    return user;
}