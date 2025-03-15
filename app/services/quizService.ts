import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const CHATGPT_MODEL = "gpt-3.5-turbo"
const MAX_TOKENS = 16.200
const CHUNK_SIZE = 4000

const prompt = `
============================================================================================================================================
Eres un profesor y vas a ponerle un examen a tus alumnos.
Necesito que me hagas un test de 20 preguntas, con 3 posibles respuestas por cada pregunta, A, B y C. Solo una de ellas verdadera.
La respuesta verdadera puede estar en cualquier posición, en la A, B o C. Tenes que devolverme un array de objetos JSON con el siguiente formato:
[
    {
        id,
        question,
        A,
        B,
        C,
        correct
    }
].En id tienes que poner el nº de la pregunta. En question tienes que poner la pregunta. En A, B, C tienes que poner las posibles respuestas, la respuesta correcta puede estar en cualquiera de los 3. En correct tienes que poner la respuesta correcta, no tienes que poner la respuesta, solo la letra correcta.
Tienes que hacerlo en el idioma del contenido que te voy a pasar.
Tienes que mezaclar preguntas de varios tipos, de verdadero y falso y de datos en concreto del texto. Tiene que ser un 50% de cada una de ellas.
Genera un array de objetos en formato JSON, pero sin usar bloques de código. La salida debe ser un JSON válido sin marcas de código.
Tienes que usar el contenido que te voy a pasar a continuación. El contenido empezará a partir de esta cadena de caracteres "%START_CONTENT%" y finalizará con esta cadena de caracteres "%END_CONTENT%"
`

export async function processContent(content: string) {
    const filterContent = content.replace(/\.{3,}/g, "")
    const tokens = filterContent.length / 4

    if (tokens > MAX_TOKENS) {
        const textChunks: string[] = splitText(filterContent)
        return await requestChunks(textChunks)
    }

    return await requestChunks([filterContent])
}

async function requestChunks(chunks: string[]) {
    chunks.push(prompt);

    const requests = chunks.map((chunk: string) =>
        openai.chat.completions.create({
            model: CHATGPT_MODEL,
            messages: [{ role: "user", content: chunk }],
            max_tokens: 3500,
        })
    );

    const responses = await Promise.all(requests);
    return responses.map(res => res.choices[0].message?.content || "")
}

function splitText(text: string, maxLength: number = CHUNK_SIZE) {
    let chunks: string[] = [];
    for (let i = 0; i < text.length; i += maxLength) {
        chunks.push(text.slice(i, i + maxLength));
    }
    return chunks;
}



// const response = await openai.chat.completions.create({
//     model: CHATGPT_MODEL,
//     messages: [{ role: "user", content: prompt }],
//     max_tokens: 2000,
// });
// console.log(response.choices[0].message?.content)
// const quizResponse = JSON.parse(response.choices[0].message?.content || '')
// console.log(quizResponse);