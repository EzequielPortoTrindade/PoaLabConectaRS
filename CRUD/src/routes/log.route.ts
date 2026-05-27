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
            id_itemConsumo,
            id_itemCapital,
            id_escola
        } = req.body;

        try {
            const data = await saidaUseCase.create({
                descricao,
                data_saida,
                id_usuario,
                id_itemConsumo,
                id_itemCapital,
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
}