import type { FastifyInstance } from "fastify"
import { z } from "zod"

import { createUserSchema } from "../schemas/user/user.create.js"

import { PrismaUsersRepository } from "../repositories/prisma/user.repo.js"
import { CreateUserService } from "../service/create.user.js"

type CreateUserBody = z.infer<typeof createUserSchema>

export async function usersRoutes(app: FastifyInstance) {
  app.post<{ Body: CreateUserBody }>(
    "/users",
    {
      schema: {
        body: createUserSchema,
      },
    },
    async (request, reply) => {
      const data = request.body 

      const repository = new PrismaUsersRepository()
      const service = new CreateUserService(repository)

      const user = await service.execute(data)

      return reply.status(201).send(user)
    }
  )
}