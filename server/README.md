# Server TypeScript - Fastify + Prisma

## Stack
- **Fastify** - HTTP server
- **Prisma** - ORM (PostgreSQL em produção)
- **Mongoose** - ODM (MongoDB em desenvolvimento/testes)
- **Zod** - Validação de schemas
- **TypeScript**

## Variáveis de ambiente

```env
DATABASE_URL=postgresql://user:pass@localhost:5432/db   # produção
MONGODB_URI=mongodb://localhost:27017/escola_db         # desenvolvimento
NODE_ENV=development | production
PORT=3000
```

## Rodar

```bash
npm install
npx prisma migrate dev     # PostgreSQL
npm run dev                # MongoDB (NODE_ENV=development)
npm run build && npm start # PostgreSQL (NODE_ENV=production)
```
