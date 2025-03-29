import OpenAI from "openai";
import { models } from "../models";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const CHATGPT_MODEL = "gpt-3.5-turbo"
const CHUNK_SIZE = 6000

const testLevel: any = {
    "1": "baja",
    "2": "media",
    "3": "alta"
}

function getPrompt(sizeQuestions: Number, difficulty: string) {

    return `Eres una herramienta de aprendizaje para alumnos, especialista en hacer cuestionarios de preguntas.  
Debes generar exactamente **${sizeQuestions}** preguntas por cada parte del contenido. **Ni una más, ni una menos.**  

🔹 **REGLAS ESTRICTAS:**  
1️⃣ **Debes devolver exactamente ${sizeQuestions} preguntas** en un JSON válido.  
2️⃣ **El campo "id" debe ir del 1 al ${sizeQuestions} en orden consecutivo, sin saltos ni repeticiones.**  
3️⃣ **No puedes agregar preguntas adicionales ni omitir ninguna.**  
4️⃣ **Cada pregunta debe tener tres respuestas posibles (A, B y C), con una única respuesta correcta.**  
5️⃣ **No generes preguntas duplicadas.**  
6️⃣ **Si no puedes generar exactamente ${sizeQuestions} preguntas, repite el proceso hasta que lo logres.**
7️⃣ **Tiene que ser de defificultad ${testLevel[difficulty]}.**

🔹 **FORMATO ESTRICTO DEL JSON:**  
[
    {
        "id": 1,
        "question": "Texto de la pregunta",
        "A": "Opción A",
        "B": "Opción B",
        "C": "Opción C",
        "correct": "B"
    },
    {
        "id": 2,
        "question": "Texto de la pregunta",
        "A": "Opción A",
        "B": "Opción B",
        "C": "Opción C",
        "correct": "C"
    },
    ...
    {
        "id": ${sizeQuestions},
        "question": "Última pregunta",
        "A": "Opción A",
        "B": "Opción B",
        "C": "Opción C",
        "correct": "A"
    }
]

**RECUERDA:**  
- **No uses ${"` ```json `"} ni ${"` ``` `"}. Devuelve solo el JSON puro.**  
- **Cada pregunta debe tener un ID único, del 1 al ${sizeQuestions}, sin saltos ni repeticiones.**  
- **Las respuestas correctas deben estar distribuidas entre A, B y C.**  
        `
}

export async function processContent(pdf: any) {
    try {
        const filterContent = pdf.content.replace(/\.{3,}/g, "")
        const prompt = getPrompt(pdf.sizeQuestions, pdf.difficulty)


        const textChunks: string[] = splitText(filterContent)
        const response = await requestChunks(textChunks, prompt)
        const questions: any = await parseChunkResponse(response, pdf.sizeQuestions)

        await models.Quiz.create({
            pdfId: pdf.id,
            difficulty: pdf.difficulty,
            size: pdf.sizeQuestions,
            questions
        })

    } catch (error: any) {
        throw new Error(error)
    }
}

async function parseChunkResponse(response: string[], sizeQuestions: Number) {
    let questions: any = [];

    response.forEach((parsedQuestions: any) => {
        parsedQuestions.forEach((q: any) => {
            if (questions.length < sizeQuestions) {
                let find = questions.some((question: any) => question.question === q.question);

                if (!find) {
                    questions.push({
                        ...q,
                        id: questions.length + 1
                    });
                }
            }
        });
    });

    return questions;
}

async function requestChunks(chunks: string[], prompt: string) {
    const requests = chunks.map((chunk: string) =>
        openai.chat.completions.create({
            model: CHATGPT_MODEL,
            temperature: 0,
            stream: false,
            messages: [{ role: "user", content: prompt + "%START_CONTENT%" + chunk + "%END_CONTENT%" }],
            max_tokens: 4096,
        })
    );
    const responses = [];

    for await (const request of requests) {
        responses.push(JSON.parse(request.choices[0].message.content || ""))
    }

    return responses;

}

function splitText(text: string, maxLength: number = CHUNK_SIZE) {
    let chunks: string[] = [];
    for (let i = 0; i < text.length; i += maxLength) {
        chunks.push(text.slice(i, i + maxLength));
    }
    return chunks;
}

export async function getAll(userId: string, page = 1, limit: number = 10) {
    try {
        const offset = (page - 1) * limit;

        const { count, rows } = await models.PDF.findAndCountAll(
            {
                where: { userId },
                offset,
                limit,
                include: [
                    {
                        model: models.Quiz,
                        as: 'Quizzes',
                        required: false,
                    }
                ]
            }
        )

        return {
            total: count,
            data: rows,
        };

    } catch (error) {
        throw new Error(`Internal Server Error: ${error}`)
    }
}