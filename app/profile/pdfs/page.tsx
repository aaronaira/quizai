'use client'
import PDF from "@/app/components/PDF";
import { useEffect, useState } from "react"

interface PDFAttributes {
    id?: string;
    name: string;
    hash: string;
    size: number;
    content: string;
    userId: string;
}

function Pdfs() {
    const [getPdfs, setPdfs] = useState<Array<PDFAttributes>>([])
    const [error, setError] = useState(null)

    const fetchFiles = () => {
        fetch('/api/pdf')
            .then(response => response.json())
            .then(data => setPdfs(data.data))
            .catch(setError)
    }

    useEffect(() => {
        fetchFiles()
    }, [])

    return (
        <div>
            {
                getPdfs.length > 0 &&
                getPdfs.map(pdf => {
                    return <PDF key={pdf.id} pdf={pdf} />
                })
            }
        </div>
    )
}

export default Pdfs