import { FastifyInstance } from "fastify";

export function Route(fastify: FastifyInstance){
    //const
    fastify.post('/', (req, reply) => {
        try {

        } catch (error){
            reply.send(error)
        }
    })
}