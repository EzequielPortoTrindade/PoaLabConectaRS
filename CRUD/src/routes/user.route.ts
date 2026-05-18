import { FastifyInstance } from "fastify";
import { UserUseCase } from "../usecases/user.usecase.js";
import { UserCreate } from "../interfaces/user.interface.js";

export async function userRoutes (fastify: FastifyInstance){
    const userUseCase = new UserUseCase();
    fastify.post<{Body: UserCreate}>('/', async (req, reply) => {
        const {nome, email, senha, tipo, id_escola} = req.body
        try {
            const data = await userUseCase.create({
                nome, 
                email, 
                senha, 
                tipo, 
                id_escola
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