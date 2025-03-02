import pdf from 'pdf-parse';
import crypto from 'crypto'
import path from "path";
import fs from 'fs/promises';
import { sequelize, models } from '@/app/models';

const BASE_DIR = path.join(process.cwd(), "uploads");

export async function processPDF(userId: string, fileBuffer: Buffer, fileName: string) {
    const user = await models.User.findByPk(userId);
    console.log("EL USER =>>>>>>>>>>>>>>>>>", user);
}


async function hash(fileBuffer: Buffer) {
    const hash = crypto.createHash('md5');

    try {
        hash.update(fileBuffer);
        const fileHash = hash.digest('hex')
        return fileHash;
    } catch (error) {
        throw new Error(`Internal Server Error: ${error}`)
    }
}

async function store(userId: string, fileBuffer: Buffer, fileName: string) {
    const userPath = path.join(BASE_DIR, userId);
    const filePath = path.join(userPath, fileName);

    try {
        await fs.mkdir(userPath, { recursive: true });
        await fs.writeFile(filePath, fileBuffer);

    } catch (error: any) {
        throw new Error(`Internal Server Error: ${error.message}`);
    }
}

async function content(buffer: any) {
    try {
        const pdfData = await pdf(buffer);
        return pdfData.text.trim()
    } catch (pdfError: any) {
        throw Error(`Error while processing pdf file: ${pdfError}`)
    }
}