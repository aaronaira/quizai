import { Trash } from 'lucide-react'
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction }
    from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from 'react';

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
interface PDFProps {
    pdf?: PDFAttributes;
    onDelete?: (hash?: string) => void;
    onGenerate?: (pdf?: PDFAttributes) => void;
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
                    <AlertDialogAction onClick={() => onDelete && onDelete(pdf?.hash)}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

function ConfigureQuiz({ getSize, setSize, getDifficulty, setDifficulty }: {
    getSize: number;
    setSize: (size: number) => void;
    getDifficulty: string;
    setDifficulty: (difficulty: string) => void;
}) {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm">Configure Quiz</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit quiz</DialogTitle>
                    <DialogDescription>
                        Make changes to your quiz here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="difficult" className="text-right">
                            Difficulty
                        </Label>
                        <Select value={getDifficulty} onValueChange={setDifficulty}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1" defaultChecked>Easy</SelectItem>
                                <SelectItem value="2">Medium</SelectItem>
                                <SelectItem value="3">Hard</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="size" className="text-right">
                            Number of questions
                        </Label>
                        <Input type="number" defaultValue={getSize} min={20} max={100} id="size" onChange={(e) => setSize(Number(e.target.value))} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="submit">Save changes</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}

function PDF({ pdf, onDelete, onGenerate }: PDFProps) {
    const [getSize, setSize] = useState<number>(20);
    const [getDifficulty, setDifficulty] = useState<string>("1");

    return (
        <div className='flex p-4 items-center justify-between rounded-md shadow-md'>
            <Alert pdf={pdf} onDelete={onDelete} />
            <div className="flex flex-col max-w-[30%]">
                <h6>{pdf?.name}</h6>
                <div className='flex gap-x-2'>
                    <small>Size: {pdf && (pdf.size / (1024 * 1024)).toFixed(2)} MB</small>
                    <small>{pdf && new Date(pdf.createdAt).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric"
                    })}</small>
                </div>
            </div>
            <div className='flex flex-col gap-y-2'>
                <Button
                    variant="brand"
                    onClick={() => {
                        if (!pdf) return;
                        onGenerate && onGenerate({
                            ...pdf,
                            sizeQuestions: getSize,
                            difficulty: getDifficulty
                        });
                    }}
                >Generate Quiz</Button>
                <ConfigureQuiz getSize={getSize} setSize={setSize} getDifficulty={getDifficulty} setDifficulty={setDifficulty} />
            </div>
        </div>
    )
}

export default PDF