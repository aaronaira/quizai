import { FileText } from "lucide-react"

function PageTitle() {
    return (
        <div className="flex space-x-3 items-center">
            <div className="p-2 bg-[--main-color] rounded">
                <FileText color="#fff" />
            </div>
            <h1 className="text-2xl font-bold">Online QUIZ Generator</h1>
        </div>
    )
}

export default PageTitle