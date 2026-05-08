import { PrismaClient } from "@prisma/client"
import mongoose from 'mongoose'

const isProduction = process.env.NODE_ENV === 'production'

export const prisma = new PrismaClient({
  log: isProduction ? ['error'] : ['query', 'warn', 'error'],
})

export async function connectPostgres() {
    await prisma.$connect()
    console.log('PostgreSQL connected')
}

export async function connectMongo() {
    const uri = process.env.DATABASE_URL
    if(!uri) {
        throw new Error("DATABASE_URL undefined")
    }
    await mongoose.connect(uri)
    console.log('MongoDB connected')
}

export async function connectDB() {
    if(isProduction){
        await connectPostgres()
    } else {
        await connectMongo()
    }
}

export async function disconnectDB() {
    if(isProduction) {
        await prisma.$disconnect()
    } else {
        await mongoose.disconnect()
    }
}