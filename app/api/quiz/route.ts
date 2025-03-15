import { auth } from "@/app/auth";
import { processContent } from "@/app/services/quizService";


export async function POST(req: Request): Promise<Response> {

    try {
        const session = await auth();

        if (!session) {
            return Response.json({ message: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const parsedData = await processContent(body.content)
        console.log(parsedData)


        // const parsedContent = body.content.replace(/\.{3,}/g, ".")
        // const prompt = `Eres un profesor y vas a ponerle un examen a tus alumnos. 
        // Necesito que me hagas un test de 20 preguntas, con 3 posibles respuestas por cada pregunta, A, B y C. Solo una de ellas verdadera. 
        // La respuesta verdadera puede estar en cualquier posición, en la A, B o C. Tenes que devolverme un array de objetos JSON con el siguiente formato: 
        // [
        //     {
        //         id,
        //         question,
        //         A,
        //         B,
        //         C,
        //         correct
        //     }
        // ].En id tienes que poner el nº de la pregunta. En question tienes que poner la pregunta. En A, B, C tienes que poner las posibles respuestas, la respuesta correcta puede estar en cualquiera de los 3. En correct tienes que poner la respuesta correcta, no tienes que poner la respuesta, solo la letra correcta.
        // Tienes que hacerlo en el idioma del contenido que te voy a pasar.
        // Tienes que mezaclar preguntas de varios tipos, de verdadero y falso y de datos en concreto del texto. Tiene que ser un 50% de cada una de ellas.
        // Genera un array de objetos en formato JSON, pero sin usar bloques de código. La salida debe ser un JSON válido sin marcas de código.
        // El contenido viene a partir de aqui:
        // ======================
        // ${parsedContent}`

        // const response = await openai.chat.completions.create({
        //     model: "gpt-3.5-turbo",
        //     messages: [{ role: "user", content: prompt }],
        //     max_tokens: 2000,
        // });
        // console.log(response.choices[0].message?.content)
        // const quizResponse = JSON.parse(response.choices[0].message?.content || '')
        // console.log(quizResponse);


        return Response.json({ success: "yes" }, { status: 200 });


    } catch (error: any) {
        console.log(error)
        return Response.json({ error: `Error: ${error.message}` }, { status: 500 });
    }
}
