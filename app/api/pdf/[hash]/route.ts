import { auth } from "@/app/auth"
import { _delete } from "@/app/services/pdfService";


export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ hash: string }> }
) {
    try {
        const session = await auth();
        const userId = session?.user?.id || '';

        const { hash } = await params

        const deleted = await _delete(userId, hash);

        return Response.json(deleted)

    } catch (error: any) {

        return Response.json({ error: `Error: ${error.message}` }, { status: 500 });
    }
}