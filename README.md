# PoaLabConectaRS
Projeto de gerenciamento de inventário

pnpm install       # instala dependências
pnpm run dev       # desenvolvimento

# produção:
npm run build
npm start

# teste:
npm test
npm run test:watch

pnpm prisma migrate dev --name init

# alterações futuras:

- Quando o projeto for para produção, o schema e o item (num_patrimonio array) deve ser alterado para o postgresql


