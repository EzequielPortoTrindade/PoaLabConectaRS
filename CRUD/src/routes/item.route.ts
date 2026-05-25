import { FastifyInstance } from "fastify";
import { ItemUseCase } from "../usecases/item.usecase.js";
import { ItemCreate } from "../interfaces/item.interface.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

export async function itemRoutes(fastify: FastifyInstance) {
    const itemUseCase = new ItemUseCase();

    fastify.addHook("preHandler", authMiddleware);

    fastify.post<{ Body: ItemCreate }>("/", async (req, reply) => {
        const {
            quantidade,
            nome,
            categoria,
            descricao,
            id_escola,
            id_fornecedor,
            num_patrimonio
        } = req.body;

        try {
            const data = await itemUseCase.create({
                quantidade,
                nome,
                categoria,
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