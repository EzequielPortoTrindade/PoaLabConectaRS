// src/routes/escola.routes.ts
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { EscolaSchema } from '../schemas'
import { getEscolaRepository } from '../repositories/escola.repository'

const repo = getEscolaRepository()

export async function escolaRoutes(fastify: FastifyInstance) {
  // GET /escolas
  fastify.get('/', async (_req: FastifyRequest, reply: FastifyReply) => {
    const escolas = await repo.findAll()
    return reply.send(escolas)
  })

  // GET /escolas/:id
  fastify.get<{ Params: { id: string } }>(
    '/:id',
    async (req, reply) => {
      const escola = await repo.findById(req.params.id)
      if (!escola) return reply.status(404).send({ message: 'Escola não encontrada' })
      return reply.send(escola)
    }
  )

  // POST /escolas
  fastify.post('/', async (req: FastifyRequest, reply: FastifyReply) => {
    const parsed = EscolaSchema.safeParse(req.body)
    if (!parsed.success) {
      return reply.status(400).send({ errors: parsed.error.flatten() })
    }
    const escola = await repo.create(parsed.data)
    return reply.status(201).send(escola)
  })

  // PUT /escolas/:id
  fastify.put<{ Params: { id: string } }>(
    '/:id',
    async (req, reply) => {
      const parsed = EscolaSchema.partial().safeParse(req.body)
      if (!parsed.success) {
        return reply.status(400).send({ errors: parsed.error.flatten() })
      }
      const escola = await repo.update(req.params.id, parsed.data)
      if (!escola) return reply.status(404).send({ message: 'Escola não encontrada' })
      return reply.send(escola)
    }
  )

  // DELETE /escolas/:id
  fastify.delete<{ Params: { id: string } }>(
    '/:id',
    async (req, reply) => {
      const deleted = await repo.delete(req.params.id)
      if (!deleted) return reply.status(404).send({ message: 'Escola não encontrada' })
      return reply.status(204).send()
    }
  )
}
