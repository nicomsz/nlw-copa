import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "../libs/prisma"
import  fetch  from 'node-fetch'
import { authenticate } from "../plugins/authenticate"



export async function authRoutes (fastify: FastifyInstance) {
    fastify.post(
        '/me',
        {
            onRequest: [authenticate]
        },
        async (req) => {
        return { user: req.user}
    })
    fastify.post('/users', async (req) => {
        const createUserBody = z.object({
            access_token: z.string(), 
        })

        const { access_token } = createUserBody.parse(req.body)
        const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            method: 'get',
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        const userData = await userResponse.json()
        const userInfoSchema = z.object({
            id: z.string(),
            email: z.string().email(),
            name: z.string(),
            picture: z.string().url(),
        })
        const userInfo = userInfoSchema.parse(userData)

        let user = await prisma.user.findUnique({
            where: {
                googleId: userInfo.id
            }
        })
        if (!user) {
            user = await prisma.user.create({
                data: {
                    googleId: userInfo.id,
                    name: userInfo.name,
                    email: userInfo.email,
                    avatarURL: userInfo.picture
                }
            })
        }
        const token = fastify.jwt.sign({
            name: user.name,
            avatarUrl: user.avatarURL,
        }, {
            sub: user.id,
            expiresIn: '7 days'
        })
        return { token }
    })
}