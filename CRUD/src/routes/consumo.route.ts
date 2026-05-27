import { FastifyInstance } from "fastify";
import { ItemConsumoUseCase } from "../usecases/consumo.usecase.js";
import { ItemConsumoCreate } from "../interfaces/consumo.interface.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

export async function itemConsumoRoutes(fastify: FastifyInstance) {
    const itemUseCase = new ItemConsumoUseCase();

    fastify.addHook("preHandler", authMiddleware);

    fastify.post<{ Body: ItemConsumoCreate }>("/", async (req, reply) => {
        const {
            quantidade,
            nome,
            descricao,
            id_escola,
            id_fornecedor
        } = req.body;

        try {
            const data = await itemUseCase.create({
                quantidade,
                nome,
                descricao,
                id_escola,
                id_fornecedor
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