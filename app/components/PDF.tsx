import { Trash, CirclePlay } from 'lucide-react'
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction }
    from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';

interface PDFAttributes {
    id?: string;
    name: string;
    hash: string;
    size: number;
    content: string;
    userId: string;
    createdAt: string | Date;
}
interface PDFProps {
    pdf: PDFAttributes;
    onDelete: (hash: string) => void;
}


function Alert({ pdf, onDelete }: PDFProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Trash className='hover:text-[--main-color] cursor-pointer' />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the file from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onDelete(pdf.hash)}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

function PDF({ pdf, onDelete }: PDFProps) {
    return (
        <div className='flex p-4 items-center justify-between rounded-md shadow-md'>
            <Alert pdf={pdf} onDelete={onDelete} />
            <div className="flex flex-col max-w-[30%]">
                <h6>{pdf.name}</h6>
                <div className='flex gap-x-2'>
                    <small>Size: {(pdf.size / (1024 * 1024)).toFixed(2)} MB</small>
                    <small>{new Date(pdf.createdAt).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric"
                    })}</small>
                </div>
            </div>
            <Button variant="brand">Generate Quiz</Button>
        </div>
    )
}

export default PDF