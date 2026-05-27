import { FastifyInstance } from "fastify";
import { UserUseCase } from "../usecases/user.usecase.js";
import { UserCreate } from "../interfaces/user.interface.js";
import { UserRepoPrisma } from "../repositories/user.repository.js"; // Importado aqui

export async function userRoutes(fastify: FastifyInstance) {
    // Injetamos a implementação do Prisma aqui na criação da rota
    const userRepo = new UserRepoPrisma();
    const userUseCase = new UserUseCase(userRepo);

    // POST - Criação de Usuário
    fastify.post<{ Body: UserCreate }>('/', async (req, reply) => {
        const { nome, email, senha, tipo, id_escola } = req.body;
        try {
            const data = await userUseCase.create({ nome, email, senha, tipo, id_escola });
            return reply.status(201).send(data); // 201 Created é o correto
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Erro interno';
            
            if (message === 'User already exists') {
                return reply.status(409).send({ message }); // 409 Conflict
            }
            return reply.status(500).send({ message });
        }
    });

    // DELETE - Deletar Usuário
    fastify.delete<{ Params: { id: string } }>('/:id', async (req, reply) => {
        try {
            const id = Number(req.params.id);
            const deletedUser = await userUseCase.delete(id);
            return reply.status(200).send(deletedUser);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Erro';
            return reply.status(message === 'User not found' ? 404 : 500).send({ message });
        }
    });

    // GET - Buscar por ID
    fastify.get<{ Params: { id: string } }>('/:id', async (req, reply) => {
        try {
            const id = Number(req.params.id);
            
            // Tratamento contra IDs inválidos (NaN) enviado na URL
            if (isNaN(id)) {
                return reply.status(400).send({ message: 'ID inválido' });
            }

            const user = await userUseCase.findById(id);

            if (!user) {
                return reply.status(404).send({ message: 'Usuário não encontrado' });
            }

            return reply.status(200).send(user);
        } catch (error) {
            return reply.status(500).send({ message: 'Erro ao buscar usuário' });
        }
    });

    // GET - Buscar por Email
    fastify.get<{ Params: { email: string } }>('/email/:email', async (req, reply) => {
        try {
            const { email } = req.params;
            const user = await userUseCase.findByEmail(email);

            if (!user) {
                return reply.status(404).send({ message: 'Usuário não encontrado' });
            }

            return reply.status(200).send(user);
        } catch (error) {
            return reply.status(500).send({ message: 'Erro ao buscar usuário' });
        }
    });
}