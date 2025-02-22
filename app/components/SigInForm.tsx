"use client"
import { signIn } from 'next-auth/react'
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { signInSchema } from "@/app/lib/zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Mail, LockKeyhole } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Separator } from '@/components/ui/separator'
import Image from 'next/image';

function SigInForm() {
    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    async function onSubmit(values: z.infer<typeof signInSchema>) {
        await signIn('credentials', {
            'email': values.email,
            'password': values.password,
            redirect: false
        })
    }

    return (
        <div className="flex flex-col">
            <div className='flex flex-col gap-y-4'>
                <h2 className='text-4xl font-normal text-center'>Sign In With</h2>
                <div className='flex justify-around'>
                    <Button
                        onClick={async () => await signIn('google', { redirectTo: "/" })}
                        className='flex bg-white hover:bg-slate-100 text-black justify-center items-center gap-x-2 w-32 border h-12 shadow-lg rounded-lg'>

                        <Image
                            src="./google.svg"
                            height={24}
                            width={24}
                            alt='SignIn with google'
                        />
                        Google
                    </Button>
                    <Button
                        onClick={async () => await signIn('github', { redirectTo: "/" })}

                        className='flex bg-white hover:bg-slate-100 text-black justify-center items-center gap-x-2 w-32 border h-12 shadow-lg rounded-lg'>
                        <Image
                            src="./github.svg"
                            height={24}
                            width={24}
                            alt='SignIn with google'
                        />
                        Github
                    </Button>
                </div>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4 rounded-md flex flex-col min-w-[400px]">

                    <div className="flex items-center my-4 w-full">
                        <Separator className="flex-1" />
                        <span className="px-4 text-sm text-muted-foreground">OR</span>
                        <Separator className="flex-1" />
                    </div>

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                                        <Input
                                            {...field}
                                            placeholder="Enter your email"
                                            className="pl-10"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <LockKeyhole className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                                        <Input
                                            type="password"
                                            placeholder="Password" {...field}
                                            className="pl-10"
                                        />
                                    </div>
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button variant="brand" type="submit">Sign In</Button>
                </form>
            </Form>
        </div>
    )
}

export default SigInForm