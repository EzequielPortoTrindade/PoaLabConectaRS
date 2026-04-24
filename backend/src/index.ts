import Fastify from 'fastify'
import 'dotenv/config'

const port = Number(process.env.PORT) || 3000

const app = Fastify({
  logger: true
})

// rota simples
app.get('/', async (request, reply) => {
  return { message: 'testando rota fastify' }
})

// iniciar servidor
const start = async () => {
  try {
    await app.listen({ port })
    console.log(`Servidor rodando em http://localhost:${port}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()