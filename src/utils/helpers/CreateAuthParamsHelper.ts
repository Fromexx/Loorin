'use server'

import { createAuthParams } from "@/api/lib/authParams"

export async function CreateAuthParams() {
    await createAuthParams();
}