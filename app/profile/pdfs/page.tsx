'use client'
import PDF from "@/app/components/PDF";
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react";

interface PDFAttributes {
    id?: string;
    name: string;
    hash: string;
    size: number;
    content: string;
    userId: string;
    createdAt: string | Date;
}

function Pdfs() {
    const [getPdfs, setPdfs] = useState<Array<PDFAttributes>>([])
    const [error, setError] = useState<null | string>(null)
    const [loading, setLoading] = useState<Boolean>(true)

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

    const handleDeletePDF = async (hash: string) => {
        const response = await fetch(`/api/pdf/${hash}`, {
            method: "delete",
        })

        const data = await response.json();
        console.log(data)
    }


    useEffect(() => {
        fetchFiles()
    }, [])

    if (loading) return <div className="flex flex-col items-center"><Loader2 className="animate-spin w-12 h-12 text-[--main-color]" /><span>Loading...</span></div>

    if (error) {
        return <div className="flex flex-col items-center"><p className="text-red-500">Error fetching data</p><small>{error}</small></div>
    }

    if (getPdfs.length == 0) return <p>Not found pdf file</p>

    return (
        <div>
            {
                (getPdfs) &&
                getPdfs.map(pdf => {
                    return <PDF key={pdf.id} pdf={pdf} onDelete={handleDeletePDF} />
                })
            }
        </div>
    )
}

export default Pdfs