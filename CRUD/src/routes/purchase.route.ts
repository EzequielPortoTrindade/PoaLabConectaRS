import { FastifyInstance } from "fastify";
import { CompraUseCase } from "../usecases/purchase.usecase.js";
import { CompraCreate } from "../interfaces/purchase.interface.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

export async function compraRoutes(fastify: FastifyInstance) {
    const compraUseCase = new CompraUseCase();

    fastify.addHook("preHandler", authMiddleware);

    fastify.post<{ Body: CompraCreate }>("/", async (req, reply) => {
        const {
            quantidade,
            data_compra,
            valor_unitario,
            marca,
            nota_fiscal,
            id_usuario,
            id_fornecedor,
            id_item,
            id_escola
        } = req.body;

        try {
            const data = await compraUseCase.create({
                quantidade,
                data_compra,
                valor_unitario,
                marca,
                nota_fiscal,
                id_usuario,
                id_fornecedor,
                id_item,
                id_escola
            });

            return reply.send(data);
        } catch (error) {
            return reply.send(error);
        }
    });

    fastify.get("/", async (req, reply) => {
        return reply.send({ hello: "compra routes" });
    });
}