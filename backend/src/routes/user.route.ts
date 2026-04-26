import { FastifyInstance } from 'fastify'

export async function usersRoutes(app: FastifyInstance, controller: any) {
  app.get('/', controller.list)
  app.get('/:id', controller.get)
  app.post('/', controller.create)
}