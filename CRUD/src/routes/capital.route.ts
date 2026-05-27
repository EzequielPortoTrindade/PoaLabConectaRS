import { FastifyInstance } from "fastify";
import { ItemCapitalUseCase } from "../usecases/capital.usecase.js";
import { ItemCapitalCreate } from "../interfaces/capital.interface.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

export async function itemCapitalRoutes(fastify: FastifyInstance) {
    const itemUseCase = new ItemCapitalUseCase();

    fastify.addHook("preHandler", authMiddleware);

    fastify.post<{ Body: ItemCapitalCreate }>("/", async (req, reply) => {
        const {
            nome,
            descricao,
            id_escola,
            id_fornecedor,
            num_patrimonio
        } = req.body;

        try {
            const data = await itemUseCase.create({
                nome,
                descricao,
                id_escola,
                id_fornecedor,
                num_patrimonio
            });

            return reply.send(data);
        } catch (error) {
            return reply.send(error);
        }
    });

    fastify.get("/", async (req, reply) => {
        return reply.send({ hello: "item routes" });
    });
}