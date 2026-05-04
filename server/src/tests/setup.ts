// src/tests/setup.ts
import { vi } from 'vitest'

// Força ambiente de teste (usa MongoDB mock)
process.env.NODE_ENV = 'test'
process.env.MONGODB_URI = 'mongodb://localhost:27017/escola_test'
process.env.PORT = '3001'

// Mock do Prisma (não precisa de banco real em testes)
vi.mock('../database', () => ({
  prisma: {},
  connectDatabase: vi.fn().mockResolvedValue(undefined),
  disconnectDatabase: vi.fn().mockResolvedValue(undefined),
}))
