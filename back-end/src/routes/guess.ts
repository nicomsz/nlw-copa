import { FastifyInstance } from "fastify"
import { prisma } from "../libs/prisma"


export async function guessesRoutes (fastify: FastifyInstance) {
    fastify.get('/guesses/count', async () => { 
        const count  = await prisma.guess.count()
        return { count }
    })
}