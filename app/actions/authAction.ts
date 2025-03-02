'use server'
import { z } from 'zod';
import { signInSchema, signUpSchema } from '../lib/zod';
import { models } from '@/app/models';
import { signIn } from '../auth';
import { AuthError } from 'next-auth';

export async function signUpAction(values: z.infer<typeof signUpSchema>) {
    try {
        const { data, success } = signUpSchema.safeParse(values);

        if (!success) return { error: 'User information is wrong' }

        const user = await models.User.findOne({ where: { email: data.email } })
        if (user) return { error: 'User email already exist' }

        await models.User.create({
            name: data.name,
            email: data.email,
            password: data.password,
        })

        await signIn('credentials', {
            'email': data.email,
            'password': data.password,
            redirect: false
        })

        return { success: true }
    } catch (error) {
        return { error }
    }
}

export async function signInAction(values: z.infer<typeof signInSchema>) {
    try {
        await signIn('credentials', {
            'email': values.email,
            'password': values.password,
            redirect: false
        })
        return { success: true }
    } catch (error) {
        if (error instanceof AuthError) {
            return { error: error.cause?.err?.message }
        }

        return { error: `Internal Server Error: [${error}]` }
    }

}