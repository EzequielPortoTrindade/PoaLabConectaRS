// src/tests/integration/escola.routes.test.ts
import { describe, it, expect, vi, beforeAll, afterAll, beforeEach } from 'vitest'
import { buildApp } from '../helpers/buildApp'
import { FastifyInstance } from 'fastify'

// ─── Mock do repository ───────────────────────────────────────────────────────
// Intercepta antes de importar as rotas
const mockRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
}

vi.mock('../../repositories/escola.repository', () => ({
  getEscolaRepository: () => mockRepo,
}))

// ─── Dados de exemplo ─────────────────────────────────────────────────────────
const escolaMock = {
  _id: '665f1a2b3c4d5e6f7a8b9c0d',
  nome: 'Escola Estadual São José',
  rua: 'Rua das Flores',
  numero: 42,
  bairro: 'Centro',
  uf: 'RS',
  id_localizacao: null,
}

// ─── Setup ────────────────────────────────────────────────────────────────────
let app: FastifyInstance

beforeAll(async () => {
  app = await buildApp()
})

afterAll(async () => {
  await app.close()
})

beforeEach(() => {
  vi.clearAllMocks()
})

// ─── Testes ───────────────────────────────────────────────────────────────────
describe('GET /escolas', () => {
  it('retorna lista vazia quando não há escolas', async () => {
    mockRepo.findAll.mockResolvedValue([])

    const res = await app.inject({ method: 'GET', url: '/escolas' })

    expect(res.statusCode).toBe(200)
    expect(res.json()).toEqual([])
  })

  it('retorna lista de escolas', async () => {
    mockRepo.findAll.mockResolvedValue([escolaMock])

    const res = await app.inject({ method: 'GET', url: '/escolas' })

    expect(res.statusCode).toBe(200)
    expect(res.json()).toHaveLength(1)
    expect(res.json()[0].nome).toBe('Escola Estadual São José')
  })
})

describe('GET /escolas/:id', () => {
  it('retorna escola quando encontrada', async () => {
    mockRepo.findById.mockResolvedValue(escolaMock)

    const res = await app.inject({ method: 'GET', url: '/escolas/665f1a2b3c4d5e6f7a8b9c0d' })

    expect(res.statusCode).toBe(200)
    expect(res.json().nome).toBe('Escola Estadual São José')
  })

  it('retorna 404 quando escola não existe', async () => {
    mockRepo.findById.mockResolvedValue(null)

    const res = await app.inject({ method: 'GET', url: '/escolas/000000000000000000000000' })

    expect(res.statusCode).toBe(404)
    expect(res.json().message).toBe('Escola não encontrada')
  })
})

describe('POST /escolas', () => {
  it('cria escola com dados válidos', async () => {
    const novaEscola = { nome: 'Nova Escola', uf: 'SP' }
    mockRepo.create.mockResolvedValue({ ...escolaMock, ...novaEscola })

    const res = await app.inject({
      method: 'POST',
      url: '/escolas',
      payload: novaEscola,
    })

    expect(res.statusCode).toBe(201)
    expect(mockRepo.create).toHaveBeenCalledWith(novaEscola)
  })

  it('retorna 400 com nome vazio', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/escolas',
      payload: { nome: '' },
    })

    expect(res.statusCode).toBe(400)
    expect(mockRepo.create).not.toHaveBeenCalled()
  })

  it('retorna 400 com UF inválida', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/escolas',
      payload: { nome: 'Escola', uf: 'RGS' }, // 3 letras - inválido
    })

    expect(res.statusCode).toBe(400)
  })

  it('retorna 400 sem body', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/escolas',
      payload: {},
    })

    expect(res.statusCode).toBe(400)
  })
})

describe('PUT /escolas/:id', () => {
  it('atualiza escola existente', async () => {
    const atualizacao = { nome: 'Escola Atualizada' }
    mockRepo.update.mockResolvedValue({ ...escolaMock, ...atualizacao })

    const res = await app.inject({
      method: 'PUT',
      url: '/escolas/665f1a2b3c4d5e6f7a8b9c0d',
      payload: atualizacao,
    })

    expect(res.statusCode).toBe(200)
    expect(res.json().nome).toBe('Escola Atualizada')
  })

  it('retorna 404 quando escola não existe', async () => {
    mockRepo.update.mockResolvedValue(null)

    const res = await app.inject({
      method: 'PUT',
      url: '/escolas/000000000000000000000000',
      payload: { nome: 'Qualquer' },
    })

    expect(res.statusCode).toBe(404)
  })
})

describe('DELETE /escolas/:id', () => {
  it('deleta escola existente', async () => {
    mockRepo.delete.mockResolvedValue(true)

    const res = await app.inject({
      method: 'DELETE',
      url: '/escolas/665f1a2b3c4d5e6f7a8b9c0d',
    })

    expect(res.statusCode).toBe(204)
  })

  it('retorna 404 quando escola não existe', async () => {
    mockRepo.delete.mockResolvedValue(false)

    const res = await app.inject({
      method: 'DELETE',
      url: '/escolas/000000000000000000000000',
    })

    expect(res.statusCode).toBe(404)
  })
})

describe('GET /health', () => {
  it('retorna status ok', async () => {
    const res = await app.inject({ method: 'GET', url: '/health' })
    expect(res.statusCode).toBe(200)
    expect(res.json().status).toBe('ok')
  })
})
