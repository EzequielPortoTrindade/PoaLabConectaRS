import { describe, it, expect } from 'vitest'
import Fastify from 'fastify'
import request from 'supertest'
import { usersRoutes } from '../routes/user.route'

describe('Users Routes', () => {
  const app = Fastify()

  const fakeController = {
    list: async () => [{ id: '1', nome: 'João' }],
    get: async () => ({ id: '1', nome: 'João' }),
    create: async (req: any, reply: any) =>
      reply.status(201).send({ id: '1', ...req.body })
  }

  app.register((instance, _, done) => {
    usersRoutes(instance, fakeController)
    done()
  }, { prefix: '/users' })

  it('GET /users', async () => {
    const res = await request(app.server).get('/users')

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
  })

  it('POST /users', async () => {
    const res = await request(app.server)
      .post('/users')
      .send({
        nome: 'João',
        email: 'x@email.com',
        tipo: 'admin'
      })

    expect(res.status).toBe(201)
    expect(res.body.nome).toBe('João')
  })
})