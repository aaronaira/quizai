
import SigInForm from '@/app/components/SigInForm'
import SigInInfo from '../components/SigInInfo'
import { auth } from "@/app/auth"
import { redirect } from 'next/navigation'

async function SignIn() {
    const session = await auth()
    if (session) {
        redirect("/")
    }

    return (
        <div className='flex xl:flex-row flex-col items-center'>
            <div className='flex items-center justify-center basis-3/5'>
                <SigInForm />
            </div>
            <div className='flex items-center p-4 w-full h-screen justify-center basis-2/5 bg-slate-100'>
                <SigInInfo />
            </div>
        </div>
    )
}

export default SignIn