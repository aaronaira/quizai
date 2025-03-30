import bcrypt from 'bcryptjs';
import NextAuth from "next-auth";
import SequelizeAdapter from "@auth/sequelize-adapter"
import sequelize from "./lib/sequelize";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { signInSchema } from "./lib/zod";
import { models } from "@/app/models";
import { Model } from 'sequelize';


// export const { handlers, signIn, signOut, auth } = NextAuth({
//     providers: [
//         GitHub({
//             clientId: process.env.GITHUB_ID,
//             clientSecret: process.env.GITHUB_SECRET,
//         }),
//     ],
//     secret: process.env.AUTH_SECRET,
//     trustHost: true,
// });

export const { handlers, signIn, signOut, auth } = NextAuth({
    debug: false,
    adapter: SequelizeAdapter(sequelize),
    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET
        }),
        Credentials({
            authorize: async (credentials) => {
                const { data, success } = signInSchema.safeParse(credentials)
                if (!success) throw new Error('User information is wrong')

                const user = await models.User.findOne({ where: { email: data.email } })

                if (!user) throw new Error("User doesn't exists")

                if (!await user.comparePassword(data.password)) throw new Error("Password doesn't match")

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image
                };
            }
        })
    ],
    secret: process.env.AUTH_SECRET,
    trustHost: true,
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