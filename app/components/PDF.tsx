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
}
interface PDFProps {
    pdf: PDFAttributes;
}

function Alert() {
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
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => console.log('borro el item!')}>Aceptar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

function PDF({ pdf }: PDFProps) {
    return (
        <div className='flex p-4 items-center justify-between rounded-md shadow-md'>
            <Alert />
            <div className="flex flex-col max-w-[30%]">
                <h6>{pdf.name}</h6>
                <small>Size: {(pdf.size / (1024 * 1024)).toFixed(2)} MB</small>
            </div>
            <Button variant="brand">Generate Quiz</Button>
        </div>
    )
}

export default PDF