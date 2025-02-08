"use client";

import { useFileUpload } from "../hooks/useFileUpload";
import UploadMessage from "./UploadMessage";
import FileDropZone from "./FileDropZone";

export default function ChooseFileButton() {
    const { message, showMessage, setMessage, handleFileUpload, loading } = useFileUpload();

    return (
        <>
            <FileDropZone onFileSelected={handleFileUpload} onLoading={loading} />
            <UploadMessage message={message} showMessage={showMessage} onClose={() => setMessage({ text: "", type: null })} />
        </>
    );
}