import { FileText } from 'lucide-react'

function Logo() {
    return (
        <div className="flex items-center space-x-2">
            <FileText color='#E74C3C' size={25} /> <span className='text-3xl font-bold uppercase'>ai quiz</span>
        </div>
    )
}

export default Logo