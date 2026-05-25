import { FastifyInstance } from "fastify";
import { SaidaUseCase } from "../usecases/log.usecase.js";
import { SaidaCreate } from "../interfaces/log.interface.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

export async function saidaRoutes(fastify: FastifyInstance) {
    const saidaUseCase = new SaidaUseCase();

    fastify.addHook("preHandler", authMiddleware);

    fastify.post<{ Body: SaidaCreate }>("/", async (req, reply) => {
        const {
            descricao,
            data_saida,
            id_usuario,
            id_item,
            id_escola
        } = req.body;

        try {
            const data = await saidaUseCase.create({
                descricao,
                data_saida,
                id_usuario,
                id_item,
                id_escola
            });

            return reply.send(data);
        } catch (error) {
            return reply.send(error);
        }
    });

    fastify.get("/", async (req, reply) => {
        return reply.send({ hello: "saida routes" });
    });

    // fastify.delete<{ Params: { id_log: number } }>("/:id_log", async (req, reply) => {
    //     const { id_log } = req.params;

    //     try {
    //         const data = await saidaUseCase.delete(Number(id_log));
    //         return reply.send(data);
    //     } catch (error) {
    //         return reply.send(error);
    //     }
    // });
}