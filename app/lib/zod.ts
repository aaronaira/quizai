import { z } from "zod";

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

export const signUpSchema = z.object({
    name: z.string().min(3).max(25),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8)
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ['confirmPassword']
})
