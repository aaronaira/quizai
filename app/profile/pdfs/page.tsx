'use client'
import PDF from "@/app/components/PDF";
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import ChooseFileButton from "@/app/components/ChooseFileButton";
import { stringify } from "querystring";

interface PDFAttributes {
    id?: string;
    name: string;
    hash: string;
    size: number;
    content: string;
    userId: string;
    createdAt: string | Date;
    difficulty?: string;
    sizeQuestions: number;
}

function Pdfs() {
    const [getPdfs, setPdfs] = useState<Array<PDFAttributes>>([])
    const [error, setError] = useState<null | string>(null)
    const [loading, setLoading] = useState<Boolean>(true)
    const [quizLoading, setQuizLoading] = useState<Boolean>(false)

    const fetchFiles = async () => {
        try {
            const response = await fetch('/api/pdf')
            const { data, error } = await response.json();

            if (error) {
                setError(error)
            } else {
                setPdfs(data)
            }

        } catch (err: any) {
            setError(err)
        } finally {
            setLoading(false)
        }

    }

    const handleDeletePDF = async (hash: any) => {
        const response = await fetch(`/api/pdf/${hash}`, {
            method: "delete",
        })

        const { success, error } = await response.json();
        if (success) {
            setPdfs(prevPdfs => prevPdfs.filter(pdf => pdf.hash !== hash));
            toast('The file was deleted successfully')
        } else {
            toast(error)
        }
    }

    const handleGenerateQuiz = async (pdf: any) => {
        try {
            setQuizLoading(true)
            const response = await fetch('/api/quiz', {
                headers: {
                    "Content-Type": "application/json",
                },
                method: 'POST',
                body: JSON.stringify(pdf)
            })

            const data = await response.json();
            console.log(data)

        } catch (err: any) {
            setError(err)
        } finally {
            setQuizLoading(false)
        }
    }


    useEffect(() => {
        fetchFiles()
    }, [])

    if (quizLoading) return <div className="flex flex-col items-center"><span>Generating the quiz, please wait...</span><Loader2 className="animate-spin w-12 h-12 text-[--main-color]" /></div>
    if (loading) return <div className="flex flex-col items-center"><Loader2 className="animate-spin w-12 h-12 text-[--main-color]" /><span>Loading...</span></div>

    if (error) {
        return <div className="flex flex-col items-center"><p className="text-red-500">Error fetching data</p><small>{error}</small></div>
    }

    if (getPdfs.length == 0) return <div className="flex flex-col items-center"><ChooseFileButton /></div>

    return (
        <div>
            {
                (getPdfs) &&
                getPdfs.map(pdf => {
                    return <PDF key={pdf.id} pdf={pdf} onDelete={handleDeletePDF} onGenerate={handleGenerateQuiz} />
                })
            }
        </div>
    )
}

export default Pdfs