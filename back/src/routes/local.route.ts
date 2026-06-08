import { FastifyInstance } from "fastify";
import { LocalUseCase } from "../usecases/local.usecase.js";
import { LocalCreate } from "../interfaces/local.interface.js";
import { LocalRepoPrisma } from "../repositories/local.repository.js"; 
import { authMiddleware } from "../middleware/auth.middleware.js";

export async function localRoutes(fastify: FastifyInstance) {
    const localRepo = new LocalRepoPrisma();
    const localUseCase = new LocalUseCase(localRepo);

    // Protege todas as rotas com o middleware de autenticação
    fastify.addHook('preHandler', authMiddleware);

    // POST - Criação de Local
    fastify.post<{ Body: LocalCreate }>('/', async (req, reply) => {
        const { nome_cidade, uf } = req.body;
        try {
            const data = await localUseCase.create({ nome_cidade, uf });
            return reply.status(201).send(data); 
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Erro interno';
            
            if (message === 'Local already exists') {
                return reply.status(409).send({ message }); 
            }
            return reply.status(500).send({ message });
        }
    });

    // DELETE - Deletar Local
    fastify.delete<{ Params: { id: string } }>('/:id', async (req, reply) => {
        try {
            const id = Number(req.params.id);

            // Validação do ID antes de tentar deletar
            if (isNaN(id)) {
                return reply.status(400).send({ message: 'ID inválido' });
            }

            const deletedLocal = await localUseCase.delete(id);
            return reply.status(200).send(deletedLocal);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Erro';
            
            // Se o usecase retornar que o local não existe
            if (message === 'Local not found') {
                return reply.status(404).send({ message });
            }
            return reply.status(500).send({ message: 'Erro ao deletar local' });
        }
    });

    // GET - Buscar Local por ID
    fastify.get<{ Params: { id: string } }>('/:id', async (req, reply) => {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                return reply.status(400).send({ message: 'ID inválido' });
            }

            const local = await localUseCase.findById(id);

            if (!local) {
                return reply.status(404).send({ message: 'Local não encontrado' });
            }

            return reply.status(200).send(local);
        } catch (error) {
            return reply.status(500).send({ message: 'Erro ao buscar local' });
        }
    });
}