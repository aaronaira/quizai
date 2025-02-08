import { useState } from "react";
import { FileUp, Loader2 } from "lucide-react";


interface FileDropZoneProps {
    onFileSelected: (file: File) => void;
    onLoading: boolean;
}

export default function FileDropZone({ onFileSelected, onLoading }: FileDropZoneProps) {
    const [isDragging, setIsDragging] = useState(false);

    const handleDrag = (e: React.DragEvent, dragging: boolean) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(dragging);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.files.length > 0) {
            onFileSelected(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onFileSelected(e.target.files[0]);
        }
    };

    return (
        <label
            className={`min-w-[500px] flex flex-col justify-center items-center h-40 border-2 p-4 border-dashed transition-all cursor-pointer
                ${isDragging ? "text-white bg-[--main-color-b] border-[--main-color]" : "bg-slate-200 border-gray-400"}`}
            onDragEnter={(e) => handleDrag(e, true)}
            onDragLeave={(e) => handleDrag(e, false)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
        >
            {onLoading ? <div className="flex items-center gap-x-5">
                <Loader2 size={42} className="animate-spin text-[--main-color-b]" />
                <b className="text-[--main-font]">Processing file...</b>
            </div> : <>
                <FileUp className="mb-2" />
                <p><strong>Click to upload</strong> or drag and drop</p>
                <p>PDF (MAX. {process.env.NEXT_PUBLIC_MAX_FILE_SIZE}MB)</p>
                <input type="file" className="hidden" accept=".pdf" onChange={handleFileChange} />
            </>}

        </label>
    );
}
