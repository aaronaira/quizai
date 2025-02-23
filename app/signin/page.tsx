
import SigInForm from '@/app/components/SignInForm'
import SignInfo from '../components/SignInfo'
import { auth } from "@/app/auth"
import { redirect } from 'next/navigation'

const title = "Log in to your workspace"
const subTitle = "Enter your email and password to access your QuizAI account. You're just one step away from creating awesome tests to boost your learning speed."

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
                <SignInfo title={title} subTitle={subTitle} />
            </div>
        </div>
    )
}

export default SignIn