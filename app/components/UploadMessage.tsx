import { X } from "lucide-react";

interface UploadMessageProps {
    message: { text: string; type: "error" | "success" | null };
    showMessage: boolean;
    onClose: () => void;
}

function UploadMessage({ message, showMessage, onClose }: UploadMessageProps) {
    if (!message.type) return null;

    return (
        <div
            className={`text-white p-2 rounded text-md items-center justify-between absolute w-[500px] top-40 font-semibold flex transition-opacity duration-500 
            ${showMessage ? "opacity-100" : "opacity-0"}
            ${message.type === "success" ? "bg-green-500" : "bg-red-500"}`}
        >
            <span>{message.text}</span>
            <X className="font-bold cursor-pointer" onClick={onClose} />
        </div>
    );
}

export default UploadMessage

