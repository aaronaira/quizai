
import { getSession } from "@/app/services/authService";
import { processPDF, getAll } from "@/app/services/pdfService";
import { auth } from "@/app/auth";

export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session) {
            return Response.json({ message: "Unauthorized" }, { status: 401 });
        }

        const pdfs = await getAll(session?.user?.id || '')

        return Response.json({ data: pdfs })

    } catch (error: any) {
        return Response.json({ error: `Error: ${error.message}` }, { status: 500 });
    }
}

export async function POST(req: Request) {

    try {
        const session = await getSession();
        if (!session) {
            return Response.json({ message: "Unauthorized" }, { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return Response.json({ message: 'No file uploaded' }, { status: 400 });
        }

        const data: ArrayBuffer | undefined = await file?.arrayBuffer();

        if (!data) {
            return Response.json({ message: 'File data is empty' }, { status: 400 });
        }

        const buffer = Buffer.from(new Uint8Array(data));
        const userId = session?.user?.id

        await processPDF(userId || 'trash', buffer, file)

        return Response.json({ success: 'File was uploaded successfully' }, { status: 200 });


    } catch (error: any) {
        return Response.json({ error: `Error: ${error.message}` }, { status: 500 });
    }
}