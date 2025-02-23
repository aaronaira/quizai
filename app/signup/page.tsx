
import SignUpForm from '@/app/components/SignUpForm'
import SignInfo from '@/app/components/SignInfo'
import { auth } from "@/app/auth"
import { redirect } from 'next/navigation'

const title = 'PDF tools for curious minds'
const subTitle = 'Our app lets you process PDFs and instantly create quizzes from them. Learn, review, and test your knowledge effortlessly—anytime, anywhere.'

async function SignUp() {
    const session = await auth()
    if (session) {
        redirect("/")
    }

    return (
        <div className='flex xl:flex-row flex-col items-center'>
            <div className='flex items-center justify-center basis-3/5'>
                <SignUpForm />
            </div>
            <div className='flex items-center p-4 w-full h-screen justify-center basis-2/5 bg-slate-100'>
                <SignInfo title={title} subTitle={subTitle} />
            </div>
        </div>
    )
}

export default SignUp