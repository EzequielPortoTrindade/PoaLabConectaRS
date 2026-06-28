import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

// import { PrismaClient } from "@prisma/client";
// import { PrismaLibSQL } from "@prisma/adapter-libsql";

// const adapter = new PrismaLibSQL({
//   url: process.env.DATABASE_URL!,
//   authToken: process.env.DATABASE_AUTH_TOKEN!,
// });

// export const prisma = new PrismaClient({
//   adapter,
// });