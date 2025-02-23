import { FileText } from 'lucide-react'
import Link from 'next/link'

function Logo() {
    return (
        <Link className="flex items-center space-x-2" href="/"><FileText color='#E74C3C' size={25} /> <span className='text-3xl font-bold uppercase'>quiz ai</span></Link>
    )
}

export default Logo