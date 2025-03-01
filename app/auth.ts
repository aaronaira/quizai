import bcrypt from 'bcrypt';
import NextAuth from "next-auth";
import SequelizeAdapter from "@auth/sequelize-adapter"
import sequelize from "./lib/sequelize";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { signInSchema } from "./lib/zod";
import User from "./models/user";


export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: SequelizeAdapter(sequelize),
    providers: [
        GitHub,
        Google,
        Credentials({
            authorize: async (credentials) => {
                const { data, success } = signInSchema.safeParse(credentials)
                if (!success) throw new Error('User information is wrong')

                const user = await User.findOne({ where: { email: data.email } })

                if (!user) throw new Error("User doesn't exists")

                if (user.password) {
                    const isValidPassword = await bcrypt.compare(data.password, user.password);
                    if (!isValidPassword) throw new Error('Password is wrong')
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image
                };
            }
        })
    ],
    session: { strategy: 'jwt' },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id as string;
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user && typeof token.id === 'string') {
                session.user.id = token.id as string;
            }
            return session;
        },
    }
})