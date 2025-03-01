import { auth } from "@/app/auth"

export async function GET() {
    const session = await auth();
    return Response.json(session);
}  