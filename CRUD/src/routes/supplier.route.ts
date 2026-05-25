import { FastifyInstance } from "fastify";
import { FornecedorUseCase } from "../usecases/supplier.usecase.js";
import { FornecedorCreate } from "../interfaces/supplier.interface.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

export async function fornecedorRoutes(fastify: FastifyInstance) {
    const fornecedorUseCase = new FornecedorUseCase();

    fastify.addHook("preHandler", authMiddleware);

    fastify.post<{ Body: FornecedorCreate }>("/", async (req, reply) => {
        const {
            cnpj,
            nome,
            telefone,
            email,
            website,
            id_localizacao
        } = req.body;

        try {
            const data = await fornecedorUseCase.create({
                cnpj,
                nome,
                telefone,
                email,
                website,
                id_localizacao
            });

            return reply.send(data);
        } catch (error) {
            return reply.send(error);
        }
    });

    fastify.get("/", async (req, reply) => {
        return reply.send({ hello: "fornecedor routes" });
    });
}