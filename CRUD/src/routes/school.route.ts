import { FastifyInstance } from "fastify";
import { EscolaUseCase } from "../usecases/school.usecase.js";
import { EscolaCreate } from "../interfaces/school.interface.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

export async function escolaRoutes(fastify: FastifyInstance) {
    const escolaUseCase = new EscolaUseCase();

    fastify.addHook("preHandler", authMiddleware);

    fastify.post<{ Body: EscolaCreate }>("/", async (req, reply) => {
        const {
            nome,
            rua,
            numero,
            bairro,
            id_localizacao
        } = req.body;

        try {
            const data = await escolaUseCase.create({
                nome,
                rua,
                numero,
                bairro,
                id_localizacao
            });

            return reply.send(data);
        } catch (error) {
            return reply.send(error);
        }
    });

    fastify.get("/", async (req, reply) => {
        return reply.send({ hello: "escola routes" });
    });
}