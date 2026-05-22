import { tipo_categoria } from "@prisma/client";
import { prisma } from "../db/prisma-client.js";
import { Item, ItemCreate, ItemRepository } from "../interfaces/item.interface.js";

class ItemRepoPrisma implements ItemRepository{
    async create(data: ItemCreate): Promise<Item> {
            const result = await prisma.item.create({
                data: {
                    quantidade: data.quantidade,
                    nome: data.nome,
                    categoria: data.categoria as tipo_categoria,
                    descricao: data.descricao,
                    id_escola: data.id_escola,
                    id_fornecedor: data.id_fornecedor,
                    num_patrimonio: data.num_patrimonio ?? []
                }
            });
            return result;
        }
    
        async findByName(nome: string): Promise<Item | null>{
            const result = await prisma.item.findFirst({
               where: {
                nome
               } 
            });
            return result || null;
        }
}

export { ItemRepoPrisma };