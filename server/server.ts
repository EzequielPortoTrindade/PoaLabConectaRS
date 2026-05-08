// src/server.ts
import Fastify from 'fastify'
import cors from '@fastify/cors'
import { connectDatabase, disconnectDatabase } from './database'
import { escolaRoutes } from './routes/escola.routes'
import { errorHandler } from './middlewares/errorHandler'

const app = Fastify({ logger: true })

async function bootstrap() {
  // Plugins
  await app.register(cors, { origin: true })

  // Error handler global
  app.setErrorHandler(errorHandler)

  // Rotas
  app.register(escolaRoutes,      { prefix: '/escolas' })
  // Adicione as demais rotas aqui seguindo o mesmo padrão:
  // app.register(usuarioRoutes,   { prefix: '/usuarios' })
  // app.register(fornecedorRoutes,{ prefix: '/fornecedores' })
  // app.register(itemRoutes,      { prefix: '/itens' })
  // app.register(comprasRoutes,   { prefix: '/compras' })
  // app.register(logRoutes,       { prefix: '/logs' })

  // Health check
  app.get('/health', async () => ({ status: 'ok', env: process.env.NODE_ENV }))

  // Conecta ao banco
  await connectDatabase()

  // Sobe o servidor
  const port = Number(process.env.PORT) || 3000
  await app.listen({ port, host: '0.0.0.0' })
  console.log(`🚀 Servidor rodando na porta ${port}`)
  console.log(`📦 Banco: ${process.env.NODE_ENV === 'production' ? 'PostgreSQL' : 'MongoDB'}`)
}

// Graceful shutdown
const signals = ['SIGTERM', 'SIGINT'] as const
signals.forEach(signal => {
  process.on(signal, async () => {
    console.log(`\n${signal} recebido, encerrando...`)
    await app.close()
    await disconnectDatabase()
    process.exit(0)
  })
})

bootstrap().catch(err => {
  console.error('Erro ao iniciar servidor:', err)
  process.exit(1)
})
