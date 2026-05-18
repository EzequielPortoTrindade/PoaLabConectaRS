import { FastifyInstance } from "fastify";
import { LocalUseCase } from "../usecases/local.usecase.js";
import { LocalCreate } from "../interfaces/local.interface.js";

export async function userRoutes (fastify: FastifyInstance){
    const localUseCase = new LocalUseCase();
    fastify.post<{Body: LocalCreate}>('/', async (req, reply) => {
        const {nome_cidade, uf} = req.body
        try {
            const data = await localUseCase.create({
                nome_cidade,
                uf
            })
            return reply.send(data);
        } catch (error){
            reply.send(error)
        }
    });
    fastify.get('/', (req, reply) => {
        reply.send({ hello: 'world'});
    });
}