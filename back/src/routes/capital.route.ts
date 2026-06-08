import { FastifyInstance } from "fastify";
import { ItemCapitalUseCase } from "../usecases/capital.usecase.js"; 
import { ItemCapitalCreate } from "../interfaces/capital.interface.js";
import { ItemCapitalRepoPrisma } from "../repositories/capital.repository.js"; 
import { authMiddleware } from "../middleware/auth.middleware.js";

export async function itemCapitalRoutes(fastify: FastifyInstance) {
    const itemCapitalRepo = new ItemCapitalRepoPrisma();
    const itemCapitalUseCase = new ItemCapitalUseCase(itemCapitalRepo);

    // Protege todas as rotas de itens de capital com o middleware de autenticação
    fastify.addHook("preHandler", authMiddleware);

    // POST - Criar Item de Capital
    fastify.post<{ Body: ItemCapitalCreate }>("/", async (req, reply) => {
        try {
            const data = await itemCapitalUseCase.create(req.body);
            return reply.status(201).send(data); 
        } catch (error) {
            const message = error instanceof Error ? error.message : "Erro interno";
            
            if (message === "Item Capital already exists") {
                return reply.status(409).send({ message });
            }
            return reply.status(500).send({ message });
        }
    });

    // DELETE - Deletar Item de Capital por ID
    fastify.delete<{ Params: { id: string } }>("/:id", async (req, reply) => {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                return reply.status(400).send({ message: "ID inválido" });
            }

            const deletedItem = await itemCapitalUseCase.delete(id);
            return reply.status(200).send(deletedItem);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Erro interno";
            
            if (message === "Item Capital not found") {
                return reply.status(404).send({ message }); 
            }
            return reply.status(500).send({ message });
        }
    });

    // GET - Buscar Item de Capital por ID
    fastify.get<{ Params: { id: string } }>("/:id", async (req, reply) => {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                return reply.status(400).send({ message: "ID inválido" });
            }

            const item = await itemCapitalUseCase.findById(id);

            if (!item) {
                return reply.status(404).send({ message: "Item de Capital não encontrado" });
            }

            return reply.status(200).send(item);
        } catch (error) {
            return reply.status(500).send({ message: "Erro ao buscar item de capital" });
        }
    });

    // GET - Buscar Item por Número de Patrimônio
    fastify.get<{ Params: { patrimonio: string } }>("/patrimonio/:patrimonio", async (req, reply) => {
        try {
            const { patrimonio } = req.params;
            const item = await itemCapitalUseCase.findByNumPatrimonio(patrimonio);

            if (!item) {
                return reply.status(404).send({ message: "Item de Capital não encontrado com este patrimônio" });
            }

            return reply.status(200).send(item);
        } catch (error) {
            return reply.status(500).send({ message: "Erro ao buscar item por patrimônio" });
        }
    });

    // GET - Rota de checagem ou listagem geral
    fastify.get("/", async (req, reply) => {
        return reply.status(200).send({ hello: "item capital routes" });
    });
}