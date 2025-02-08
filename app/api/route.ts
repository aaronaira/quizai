import { extractPDF } from "../services/pdfService";


export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return Response.json({ message: 'No file uploaded' }, { status: 400 });
        }

        // Convertir el archivo a un ArrayBuffer y luego a un Buffer
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
        return Response.json({ message: "OK", extractedText: "pdfData.text" }, { status: 200 });
    } catch (error: any) {
        return Response.json({ message: `Error: ${error.message}` }, { status: 500 });
    }
}