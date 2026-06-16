import { FastifyInstance } from "fastify";
import { SaidaUseCase } from "../usecases/log.usecase.js";
import { SaidaCreate } from "../../../shared/log.interface.js";
import { SaidaRepoPrisma } from "../repositories/log.repository.js"; 

export async function saidaRoutes(fastify: FastifyInstance) {
    const saidaRepo = new SaidaRepoPrisma();
    const saidaUseCase = new SaidaUseCase(saidaRepo);

    // POST - Registrar uma nova Saída
    fastify.post<{ Body: SaidaCreate }>("/", async (req, reply) => {
        try {
            const data = await saidaUseCase.create(req.body);
            return reply.status(201).send(data); 
        } catch (error) {
            const message = error instanceof Error ? error.message : "Erro interno ao criar saída";
            return reply.status(500).send({ message });
        }
    });

    // DELETE - Deletar uma Saída por ID
    fastify.delete<{ Params: { id: string } }>("/:id", async (req, reply) => {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                return reply.status(400).send({ message: "ID inválido" });
            }

            const deletedSaida = await saidaUseCase.delete(id);
            return reply.status(200).send(deletedSaida);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Erro interno";
            
            if (message === "Saida not found") {
                return reply.status(404).send({ message }); 
            }
            return reply.status(500).send({ message });
        }
    });

    // GET - Buscar Saída por ID
    fastify.get<{ Params: { id: string } }>("/:id", async (req, reply) => {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                return reply.status(400).send({ message: "ID inválido" });
            }

            const readers = await saidaUseCase.findById(id);

            if (!readers) {
                return reply.status(404).send({ message: "Saída não encontrada" });
            }

            return reply.status(200).send(readers);
        } catch (error) {
            return reply.status(500).send({ message: "Erro ao buscar saída" });
        }
    });

    fastify.get('/', async (req, reply) => {
        const data = await saidaUseCase.findAll()
        return reply.send(data)
    })

    // // GET - Listagem base (Mantido e estruturado)
    // fastify.get("/", async (req, reply) => {
    //     try {
    //         return reply.status(200).send({ hello: "saida routes" });
    //     } catch (error) {
    //         return reply.status(500).send({ message: "Erro interno no servidor" });
    //     }
    // });
}