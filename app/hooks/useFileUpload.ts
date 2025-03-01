import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface typesMessage {
    text: string;
    type: "success" | "error" | null;
}

export function useFileUpload() {
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [message, setMessage] = useState<typesMessage>({ text: "", type: null })
    const [loading, setLoading] = useState<boolean>(false)

    const router = useRouter();

    useEffect(() => {

        if (message.type) {
            setShowMessage(true);
            const timeMessage = setTimeout(() => {
                setShowMessage(false);
            }, 3000);

            return () => clearTimeout(timeMessage)
        }
    }, [message])

    const handleFileUpload = async (file: File) => {
        setLoading(true)
        const { type, size } = file

        const maxSize = Number(process.env.NEXT_PUBLIC_MAX_FILE_SIZE)
        const fileSizeMB = size / (1024 * 1024);
        const isAvailableSize = fileSizeMB <= maxSize && fileSizeMB > 0

        if (type !== process.env.NEXT_PUBLIC_ALLOWED_FILE_EXTENSION) {
            setMessage({ text: `Sorry, this extensión is not allowed ${type}`, type: "error" });
            setLoading(false)
            return;
        }

        if (!isAvailableSize) {
            setMessage({ text: `The max file size is ${maxSize}`, type: "error" });
            setLoading(false)
            return;
        }


        const formData = new FormData();
        formData.append("file", file);
        try {
            const response = await fetch('/api', {
                method: 'POST',
                body: formData
            })

            if (response.status === 401) router.push('/signin')

            const data = await response.json()


            if (data?.message === "OK") {
                setMessage({ text: `File was uploaded successfully`, type: "success" })
            }



        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    };

    return { loading, message, showMessage, setMessage, handleFileUpload };
}

