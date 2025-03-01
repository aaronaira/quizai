import { extractPDF } from "../services/pdfService";
import { auth } from "@/app/auth"

export async function POST(req: Request) {
    const session = await auth()

    if (!session) {
        return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
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

        try {
            const pdfData = await extractPDF(buffer)
            return Response.json({ message: 'OK', extractedText: pdfData }, { status: 200 });
        } catch (pdfError: any) {
            console.error('Error al procesar el PDF:', pdfError);
            return Response.json({ message: `Error al procesar el PDF: ${pdfError.message}` }, { status: 500 });
        }

    } catch (error: any) {
        return Response.json({ message: `Error: ${error.message}` }, { status: 500 });
    }
}