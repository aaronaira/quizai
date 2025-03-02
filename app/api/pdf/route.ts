
import { getSession } from "@/app/services/authService";
import { processPDF } from "@/app/services/pdfService";
;
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

        processPDF(userId || 'trash', buffer, file.name)

        return Response.json({ message: 'OK' }, { status: 200 });


    } catch (error: any) {
        return Response.json({ message: `Error: ${error.message}` }, { status: 500 });
    }
}