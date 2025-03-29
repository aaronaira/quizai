import { auth } from "@/app/auth";
import { processContent, getAll } from "@/app/services/quizService";
import { models } from "../../models";


export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session) {
            return Response.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");

        const data = await getAll(session?.user?.id || '', page, limit)
        return Response.json(data)

    } catch (error: any) {
        return Response.json({ error: `Error: [${error.message}]` }, { status: 500 });
    }
}
export async function POST(req: Request): Promise<Response> {

    try {
        const session = await auth();

        if (!session) {
            return Response.json({ message: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        await processContent(body)

        return Response.json({ success: "yes" }, { status: 200 });


    } catch (error: any) {
        console.log(error)
        return Response.json({ error: `Error: ${error.message}` }, { status: 500 });
    }
}

export async function PATCH(req: Request): Promise<Response> {
    try {

        const session = await auth();

        if (!session) {
            return Response.json({ message: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { quizId, score } = body;


        if (!quizId || score === undefined) {
            return Response.json({ message: "Quiz ID and score are required" }, { status: 400 });
        }


        const quiz = await models.Quiz.findByPk(quizId);

        if (!quiz) {
            return Response.json({ message: "Quiz not found" }, { status: 404 });
        }


        quiz.score = score;


        await quiz.save();

        return Response.json({ success: true, message: "Score updated successfully" }, { status: 200 });

    } catch (error: any) {
        console.error(error);
        return Response.json({ error: `Error: ${error.message}` }, { status: 500 });
    }
}