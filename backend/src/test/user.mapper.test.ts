// tests/userMapper.test.ts

import { describe, it, expect } from 'vitest'
import { userMapper } from '../mappers/user.mapper'

describe('UserMapper', () => {
  it('deve mapear Mongo → DTO', () => {
    const mongoUser = {
      _id: 'abc123',
      nome: 'João',
      email: 'joao@email.com',
      tipo: 'admin'
    }

    const result = userMapper.fromMongo(mongoUser)

    expect(result.id).toBe('abc123')
    expect(result.nome).toBe('João')
  })

  it('deve mapear Postgres → DTO', () => {
    const pgUser = {
      id_usuario: 1,
      nome: 'Maria',
      email: 'maria@email.com',
      tipo: 'admin'
    }

    const result = userMapper.fromPostgres(pgUser)

    expect(result.id).toBe('1')
  })
})