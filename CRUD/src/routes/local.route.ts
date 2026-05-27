import { FastifyInstance } from "fastify";
import { LocalUseCase } from "../usecases/local.usecase.js";
import { LocalCreate } from "../interfaces/local.interface.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

export async function localRoutes (fastify: FastifyInstance){
    const localUseCase = new LocalUseCase();

    fastify.addHook('preHandler', authMiddleware);

    fastify.post<{Body: LocalCreate}>('/', async (req, reply) => {
        const {
            nome_cidade, 
            uf
            } = req.body
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
        reply.send({ hello: 'local route'});
    });
}