'use client'

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
import { Input } from "@/components/ui/input"
import { Separator } from '@/components/ui/separator'
import Image from 'next/image';

function SignIn() {

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
        <div className='flex flex-col justify-center items-center h-screen'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 shadow-lg p-4 rounded-md flex flex-col min-w-[400px]">
                    <h2 className='text-4xl font-normal text-center'>Sign In With</h2>
                    <div className='flex justify-around'>
                        <Button className='flex bg-white hover:bg-slate-100 text-black justify-center items-center gap-x-2 w-32 border h-12 shadow-lg rounded-lg'>
                            <Image
                                src="./google.svg"
                                height={24}
                                width={24}
                                alt='SignIn with google'
                            />
                            Google
                        </Button>
                        <Button className='flex bg-white hover:bg-slate-100 text-black justify-center items-center gap-x-2 w-32 border h-12 shadow-lg rounded-lg'>
                            <Image
                                src="./github.svg"
                                height={24}
                                width={24}
                                alt='SignIn with google'
                            />
                            Github
                        </Button>
                    </div>

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email" {...field} />
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
                                    <Input
                                        type="password"
                                        placeholder="Password" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Sign In</Button>
                </form>
            </Form>

        </div>
    )
}

export default SignIn