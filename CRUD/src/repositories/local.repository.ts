import { prisma } from "../db/prisma-client.js";
import { Localizacao, LocalCreate, LocalRepository } from "../interfaces/local.interface.js";

class LocalRepoPrisma implements LocalRepository{
    async create(data: LocalCreate): Promise<Localizacao> {
        const result = await prisma.localizacao.create({
            data: {
                nome_cidade: data.nome_cidade,
                uf: data.uf
            }
        });
        return result;
    }

    async findByNameAndUF(nome_cidade: string, uf: string): Promise<Localizacao | null>{
        const result = await prisma.localizacao.findFirst({
           where: {
            nome_cidade,
            uf
           } 
        });
        return result || null;
    }
}

export { LocalRepoPrisma };