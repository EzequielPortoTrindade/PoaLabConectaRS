import { FastifyInstance } from "fastify";
import { FornecedorUseCase } from "../usecases/supplier.usecase.js";
import { FornecedorCreate } from "../interfaces/supplier.interface.js";
import { FornecedorRepoPrisma } from "../repositories/supplier.repository.js"; 

export async function fornecedorRoutes(fastify: FastifyInstance) {
    const fornecedorRepo = new FornecedorRepoPrisma();
    const fornecedorUseCase = new FornecedorUseCase(fornecedorRepo);

    // POST - Criar Fornecedor
    fastify.post<{ Body: FornecedorCreate }>("/", async (req, reply) => {
        try {
            const data = await fornecedorUseCase.create(req.body);
            return reply.status(201).send(data); 
        } catch (error) {
            const message = error instanceof Error ? error.message : "Erro interno";
            
            if (message === "Fornecedor already exists") {
                return reply.status(409).send({ message }); 
            }
            return reply.status(500).send({ message });
        }
    });

    // DELETE - Deletar Fornecedor por ID
    fastify.delete<{ Params: { id: string } }>("/:id", async (req, reply) => {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                return reply.status(400).send({ message: "ID inválido" });
            }

            const deletedFornecedor = await fornecedorUseCase.delete(id);
            return reply.status(200).send(deletedFornecedor);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Erro interno";
            
            if (message === "Fornecedor not found") {
                return reply.status(404).send({ message }); 
            }
            return reply.status(500).send({ message });
        }
    });

    // GET - Buscar Fornecedor por ID
    fastify.get<{ Params: { id: string } }>("/:id", async (req, reply) => {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                return reply.status(400).send({ message: "ID inválido" });
            }

            const fornecedor = await fornecedorUseCase.findById(id);

            if (!fornecedor) {
                return reply.status(404).send({ message: "Fornecedor não encontrado" });
            }

            return reply.status(200).send(fornecedor);
        } catch (error) {
            return reply.status(500).send({ message: "Erro ao buscar fornecedor" });
        }
    });

    // GET - Buscar Fornecedor por CNPJ
    fastify.get<{ Params: { cnpj: string } }>("/cnpj/:cnpj", async (req, reply) => {
        try {
            const { cnpj } = req.params;
            const proveedores = await fornecedorUseCase.findByCNPJ(cnpj);

            if (!proveedores) {
                return reply.status(404).send({ message: "Fornecedor não encontrado" });
            }

            return reply.status(200).send(proveedores);
        } catch (error) {
            return reply.status(500).send({ message: "Erro ao buscar fornecedor por CNPJ" });
        }
    });

    fastify.get('/', async (req, reply) => {
        const data = await fornecedorUseCase.findAll()
        return reply.send(data)
    })
}