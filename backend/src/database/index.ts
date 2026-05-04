// src/database/index.ts
import { PrismaClient } from '@prisma/client'
import mongoose from 'mongoose'

const isProduction = process.env.NODE_ENV === 'production'

// ─── Prisma (PostgreSQL - produção) ─────────────────────────────────────────
export const prisma = new PrismaClient({
  log: isProduction ? ['error'] : ['query', 'warn', 'error'],
})

export async function connectPostgres() {
  await prisma.$connect()
  console.log('✅ PostgreSQL conectado via Prisma')
}

// ─── Mongoose (MongoDB - desenvolvimento/testes) ─────────────────────────────
export async function connectMongo() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/escola_db'
  await mongoose.connect(uri)
  console.log('✅ MongoDB conectado via Mongoose')
}

export async function connectDatabase() {
  if (isProduction) {
    await connectPostgres()
  } else {
    await connectMongo()
  }
}

export async function disconnectDatabase() {
  if (isProduction) {
    await prisma.$disconnect()
  } else {
    await mongoose.disconnect()
  }
}
