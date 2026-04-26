import { describe, it, expect } from 'vitest'
import { UsersService } from '../services/user.service'

const fakeRepo = {
  getAll: async () => [{ id: '1', nome: 'João' }],
  getById: async (id: string) => ({ id, nome: 'João' }),
  create: async (data: any) => ({ id: '1', ...data })
}

describe('UsersService', () => {
  const service = new UsersService(fakeRepo as any)

  it('deve listar usuários', async () => {
    const users = await service.getUsers()

    expect(users).toHaveLength(1)
    expect(users[0].nome).toBe('João')
  })

  it('deve criar usuário', async () => {
    const user = await service.createUser({
      nome: 'Maria',
      email: 'maria@email.com',
      tipo: 'admin'
    })

    expect(user.nome).toBe('Maria')
  })
})