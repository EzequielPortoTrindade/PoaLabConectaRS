// src/server.ts

import Fastify from 'fastify'
import { connectMongo } from './database/mongo.connection'

import { MongoUsersRepository } from './repositories/mongo.user.repository'
import { UsersService } from './services/user.service'
import { buildUsersController } from './controllers/user.controller'
import { usersRoutes } from './routes/user.route'

const app = Fastify({ logger: true })

async function start() {
  await connectMongo()

  const repository = new MongoUsersRepository()
  const service = new UsersService(repository)
  const controller = buildUsersController(service)

  app.register((instance, opts, done) => {
    usersRoutes(instance, controller)
    done()
  }, { prefix: '/users' })

  await app.listen({ port: 3000 })
}

start()