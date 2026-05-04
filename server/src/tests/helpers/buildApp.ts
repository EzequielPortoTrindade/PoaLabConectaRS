// src/tests/helpers/buildApp.ts
import Fastify from 'fastify'
import cors from '@fastify/cors'
import { escolaRoutes } from '../../routes/escola.routes'
import { errorHandler } from '../../middlewares/errorHandler'

export async function buildApp() {
  const app = Fastify({ logger: false })

  await app.register(cors, { origin: true })
  app.setErrorHandler(errorHandler)
  app.register(escolaRoutes, { prefix: '/escolas' })
  app.get('/health', async () => ({ status: 'ok' }))

  await app.ready()
  return app
}
