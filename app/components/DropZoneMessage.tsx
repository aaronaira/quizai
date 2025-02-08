import { FileUp, Loader2 } from "lucide-react";

interface DropZoneProps {
    onLoading: boolean;
    handleFileChange: React.ChangeEvent<HTMLInputElement>
}

function OnLoadMessage() {
    return (
        <button className="bg-[--main-color] text-white font-bold text-sm flex justify-between items-center p-2">
            <Loader2 className="animate-spin" /><span>Processing...</span>
        </button>
    )
}

function FileUploadMessage({ handleFileChange }: { handleFileChange: React.ChangeEvent<HTMLInputElement> }) {
    return (
        <>
            <FileUp className="mb-2" />
            <p><strong>Click to upload</strong> or drag and drop</p>
            <p>PDF (MAX. {process.env.NEXT_PUBLIC_MAX_FILE_SIZE}MB)</p>
            <input type="file" className="hidden" accept=".pdf" onChange={handleFileChange} />
        </>
    )

}

function DropZoneMessage({ onLoading, handleFileChange }: DropZoneProps) {
    return (
        <div>
            {onLoading ? <OnLoadMessage /> : <FileUploadMessage handleFileChange={handleFileChange} />}

        </div>
    )
}

export default DropZoneMessage