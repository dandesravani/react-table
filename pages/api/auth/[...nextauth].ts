import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            'email profile https://www.googleapis.com/auth/calendar.events.readonly',
        },
      },
    }),
  ],
  callbacks: {
    async signIn(args) {
      console.log({ signin: args })
      return true
    },
    async redirect(args) {
      console.log({ redirect: args })
      return args.baseUrl
    },
    async session(args) {
      console.log({ session: args })
      return args.session
    },
    async jwt(args) {
      console.log({ jwt: args })
      return args.token
    },
  },
})
