import { FastifyInstance } from "fastify";
import { ItemConsumoUseCase } from "../usecases/consumo.usecase.js"; 
import { ItemConsumoCreate } from "../../../shared/consumo.interface.js";
import { ItemConsumoRepoPrisma } from "../repositories/consumo.repository.js"; 

export async function itemConsumoRoutes(fastify: FastifyInstance) {
    const itemConsumoRepo = new ItemConsumoRepoPrisma();
    const itemConsumoUseCase = new ItemConsumoUseCase(itemConsumoRepo);

    // POST - Criar Item de Consumo
    fastify.post<{ Body: ItemConsumoCreate }>("/", async (req, reply) => {
        try {
            const data = await itemConsumoUseCase.create(req.body);
            return reply.status(201).send(data);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Erro interno";
            
            if (message === "Item Consumo already exists") {
                return reply.status(409).send({ message });
            }
            return reply.status(500).send({ message });
        }
    });

    // DELETE - Deletar Item de Consumo por ID
    fastify.delete<{ Params: { id: string } }>("/:id", async (req, reply) => {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                return reply.status(400).send({ message: "ID inválido" });
            }

            const deletedItem = await itemConsumoUseCase.delete(id);
            return reply.status(200).send(deletedItem);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Erro interno";
            
            if (message === "Item Consumo not found") {
                return reply.status(404).send({ message });
            }
            return reply.status(500).send({ message });
        }
    });

    // GET - Buscar Item de Consumo por ID
    fastify.get<{ Params: { id: string } }>("/:id", async (req, reply) => {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                return reply.status(400).send({ message: "ID inválido" });
            }

            const item = await itemConsumoUseCase.findById(id);

            if (!item) {
                return reply.status(404).send({ message: "Item de consumo não encontrado" });
            }

            return reply.status(200).send(item);
        } catch (error) {
            return reply.status(500).send({ message: "Erro ao buscar item de consumo" });
        }
    });

    // GET - Buscar Item de Consumo por Nome
    fastify.get<{ Params: { nome: string } }>("/nome/:nome", async (req, reply) => {
        try {
            const { nome } = req.params;
            const item = await itemConsumoUseCase.findByName(nome);

            if (!item) {
                return reply.status(404).send({ message: "Item de consumo não encontrado com este nome" });
            }

            return reply.status(200).send(item);
        } catch (error) {
            return reply.status(500).send({ message: "Erro ao buscar item por nome" });
        }
    });

   fastify.get('/', async (req, reply) => {
        const data = await itemConsumoUseCase.findAll()
        return reply.send(data)
    })
}