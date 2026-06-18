import { FastifyInstance } from "fastify";
import { LocalUseCase } from "../usecases/local.usecase.js";
import { LocalCreate } from "../../../shared/local.interface.js";
import { LocalRepoPrisma } from "../repositories/local.repository.js"; 

export async function localRoutes(fastify: FastifyInstance) {
    const localRepo = new LocalRepoPrisma();
    const localUseCase = new LocalUseCase(localRepo);

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
    // fastify.delete('/:id', {
    //     schema: {
    //         params: {
    //         type: 'object',
    //         properties: {
    //             id: { type: 'string' }
    //         },
    //         required: ['id']
    //         }
    //     }
    // }, async (req, reply) => {
    //     const params = req.params as { id?: string }

    //     const id = Number(params.id)

    //     if (!params.id || Number.isNaN(id)) {
    //         return reply.status(400).send({ message: 'ID inválido' })
    //     }

    //     const deleted = await localUseCase.delete(id)

    //     return reply.status(200).send(deleted)
    // })

    fastify.delete('/:id', async (req, reply) => {
        console.log("RAW PARAMS:", req.params)
        console.log("ID TYPE:", typeof (req.params as any).id)

        return reply.send(req.params)
    })

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

    fastify.get('/', async (req, reply) => {
        const data = await localUseCase.findAll()
        return reply.send(data)
    })
}