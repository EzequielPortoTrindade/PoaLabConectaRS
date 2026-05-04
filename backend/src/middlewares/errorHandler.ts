// src/middlewares/errorHandler.ts
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'

export function errorHandler(
  error: FastifyError,
  _req: FastifyRequest,
  reply: FastifyReply
) {
  console.error(error)

  // Erros Prisma comuns
  if (error.message?.includes('Record to update not found')) {
    return reply.status(404).send({ message: 'Registro não encontrado' })
  }
  if (error.message?.includes('Unique constraint')) {
    return reply.status(409).send({ message: 'Conflito: registro já existe' })
  }
  if (error.message?.includes('Foreign key constraint')) {
    return reply.status(400).send({ message: 'Referência inválida: ID estrangeiro não existe' })
  }

  // Erros Mongoose comuns
  if (error.name === 'ValidationError') {
    return reply.status(400).send({ message: error.message })
  }
  if (error.name === 'CastError') {
    return reply.status(400).send({ message: 'ID inválido' })
  }

  return reply.status(500).send({ message: 'Erro interno do servidor' })
}
