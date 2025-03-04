import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const baseUrl: string = req.nextUrl.origin
    const response = await fetch(`${req.nextUrl.origin}/api/auth/session`, {
        headers: req.headers
    })
    const session = await response.json()

    if (!session) {
        return NextResponse.redirect(`${baseUrl}/signin`)
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/profile/:path*"], // Ajusta según tus rutas protegidas
};