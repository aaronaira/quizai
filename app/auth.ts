import { adapter } from 'next/dist/server/web/adapter';
import NextAuth from "next-auth";
import SequelizeAdapter from "@auth/sequelize-adapter"
import sequelize from "./lib/sequelize";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import User from "@/app/models/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: SequelizeAdapter(sequelize),
    providers: [
        GitHub,
        Google,
        Credentials({
            authorize: async (credentials) => {
                console.log(credentials)
                return {
                    id: "1",
                    email: "aaronaira@gmail.com"
                }

                // const { email, password } = credentials

                // const user = await User.findOne({
                //     where: { email }
                // })

                // if (!user) {
                //     throw new Error("User not found")
                // };

                // if (password)
            }
        })
    ],
    session: { strategy: 'jwt' }
})