// src/repositories/escola.repository.ts
// Padrão Repository: mesma interface, duas implementações (Prisma | Mongoose)

import { prisma } from '../database'
import { EscolaModel } from '../database/mongoose/models'
import { EscolaInput } from '../schemas'

// ─── Interface comum ──────────────────────────────────────────────────────────
export interface IEscolaRepository {
  findAll(): Promise<any[]>
  findById(id: string): Promise<any | null>
  create(data: EscolaInput): Promise<any>
  update(id: string, data: Partial<EscolaInput>): Promise<any | null>
  delete(id: string): Promise<boolean>
}

// ─── Implementação Prisma (PostgreSQL) ────────────────────────────────────────
export class EscolaPrismaRepository implements IEscolaRepository {
  async findAll() {
    return prisma.escola.findMany({ include: { localizacao: true } })
  }

  async findById(id: string) {
    return prisma.escola.findUnique({
      where: { id_escola: Number(id) },
      include: { localizacao: true, usuarios: true },
    })
  }

  async create(data: EscolaInput) {
    return prisma.escola.create({ data })
  }

  async update(id: string, data: Partial<EscolaInput>) {
    return prisma.escola.update({
      where: { id_escola: Number(id) },
      data,
    })
  }

  async delete(id: string) {
    await prisma.escola.delete({ where: { id_escola: Number(id) } })
    return true
  }
}

// ─── Implementação Mongoose (MongoDB) ─────────────────────────────────────────
export class EscolaMongoRepository implements IEscolaRepository {
  async findAll() {
    return EscolaModel.find().populate('id_localizacao')
  }

  async findById(id: string) {
    return EscolaModel.findById(id).populate('id_localizacao')
  }

  async create(data: EscolaInput) {
    return EscolaModel.create(data)
  }

  async update(id: string, data: Partial<EscolaInput>) {
    return EscolaModel.findByIdAndUpdate(id, data, { new: true })
  }

  async delete(id: string) {
    const result = await EscolaModel.findByIdAndDelete(id)
    return result !== null
  }
}

// ─── Factory: retorna a implementação certa conforme o ambiente ───────────────
export function getEscolaRepository(): IEscolaRepository {
  if (process.env.NODE_ENV === 'production') {
    return new EscolaPrismaRepository()
  }
  return new EscolaMongoRepository()
}
