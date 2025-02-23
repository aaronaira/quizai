"use client"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { signUpSchema } from "@/app/lib/zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Mail, LockKeyhole, CircleUserRound } from 'lucide-react'
import { Input } from "@/components/ui/input"
import Logo from "./Logo"
import Link from "next/link"
import { signUpAction } from "../actions/authAction"
import { useRouter } from 'next/navigation';
import { useState } from "react"

function SignUpForm() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
    })

    async function onSubmit(values: z.infer<typeof signUpSchema>) {
        const response = await signUpAction(values)

        if (response?.error) {
            setError(response?.error as string)
            return
        }

        if (response?.success) router.push('/')
    }

    return (
        <div className="flex flex-col items-center">
            <Logo />
            <h2 className="text-2xl font-medium">Create new account</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4 rounded-md flex flex-col min-w-[400px]">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <CircleUserRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                                        <Input
                                            {...field}
                                            placeholder="Name"
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
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
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
                    {error && <p className='text-sm text-center text-red-500'>{error}</p>}
                    <Button variant="brand" type="submit">Sign Up</Button>
                </form>
            </Form>
            <p className='text-center'>Already member? <Link className='text-[--main-color] hover:underline' href="/signin">Log in</Link></p>
        </div>
    )
}

export default SignUpForm