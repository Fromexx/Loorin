'use server'

import { redirect } from "next/navigation";
import { deleteSession } from "@/api/lib/session";

export async function Logout() {
    deleteSession();
    redirect('/');
}