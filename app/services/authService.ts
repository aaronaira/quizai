import { auth } from "@/app/auth"

export async function getSession() {
    return await auth()
}