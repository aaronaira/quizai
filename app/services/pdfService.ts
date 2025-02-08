'use server';

import pdf from 'pdf-parse';

export async function extractPDF(buffer: any) {
    try {
        const pdfData = await pdf(buffer);
        return pdfData.text.trim()
    } catch (pdfError: any) {
        throw Error(`Error while processing pdf file: ${pdfError}`)
    }
}