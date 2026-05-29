import { FastifyInstance } from "fastify";
import { CompraUseCase } from "../usecases/purchase.usecase.js"; // Ajuste o caminho se necessário
import { CompraCreate } from "../interfaces/purchase.interface.js";
import { CompraRepoPrisma } from "../repositories/purchase.repository.js"; // O arquivo que você mandou
import { authMiddleware } from "../middleware/auth.middleware.js";

export async function compraRoutes(fastify: FastifyInstance) {
    // Injeção do repositório Prisma no UseCase de Compras
    const compraRepo = new CompraRepoPrisma();
    const compraUseCase = new CompraUseCase(compraRepo);

    // Protege todas as rotas de compras com o middleware de autenticação
    fastify.addHook('preHandler', authMiddleware);

    // POST - Registrar uma nova Compra
    fastify.post<{ Body: CompraCreate }>('/', async (req, reply) => {
        try {
            // Passa todos os dados do body diretamente para o usecase
            const data = await compraUseCase.create(req.body);
            return reply.status(201).send(data); // 201 Created
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Erro interno ao registrar compra';
            
            // Tratamento caso falte alguma regra de negócio (ex: estoque, chaves estrangeiras inválidas)
            if (message === 'Invalid purchase data') {
                return reply.status(400).send({ message });
            }
            return reply.status(500).send({ message });
        }
    });

    // DELETE - Deletar uma Compra por ID
    fastify.delete<{ Params: { id: string } }>('/:id', async (req, reply) => {
        try {
            const id = Number(req.params.id);

            // Valida se o ID enviado na URL é realmente um número
            if (isNaN(id)) {
                return reply.status(400).send({ message: 'ID inválido' });
            }

            const deletedCompra = await compraUseCase.delete(id);

            // Seu repositório retorna null se a compra não existir
            if (!deletedCompra) {
                return reply.status(404).send({ message: 'Compra não encontrada' });
            }

            return reply.status(200).send(deletedCompra);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Erro interno';
            return reply.status(500).send({ message });
        }
    });

    // GET - Buscar uma Compra por ID
    fastify.get<{ Params: { id: string } }>('/:id', async (req, reply) => {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                return reply.status(400).send({ message: 'ID inválido' });
            }

            const compra = await compraUseCase.findById(id);

            if (!compra) {
                return reply.status(404).send({ message: 'Compra não encontrada' });
            }

            return reply.status(200).send(compra);
        } catch (error) {
            return reply.status(500).send({ message: 'Erro ao buscar compra' });
        }
    });
}