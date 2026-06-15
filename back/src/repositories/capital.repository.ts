import { prisma } from "../db/prisma-client.js";
import { Item_Capital, ItemCapitalCreate, ItemCapitalRepository } from "../interfaces/capital.interface.js";

class ItemCapitalRepoPrisma implements ItemCapitalRepository{
    async create(data: ItemCapitalCreate): Promise<Item_Capital> {
            const result = await prisma.item_Capital.create({
                data: {
                    nome: data.nome,
                    emprestimo: data.emprestimo,
                    descricao: data.descricao,
                    id_escola: data.id_escola,
                    id_fornecedor: data.id_fornecedor,
                    num_patrimonio: data.num_patrimonio
                    }
                });
            return result;
        }


        async findByNumPatrimonio(num_patrimonio: string): Promise<Item_Capital | null> {
            const result = await prisma. item_Capital.findFirst({
                where: {
                    num_patrimonio
                }
            });
            return result;
        }

        async findById(id_itemCapital: number): Promise<Item_Capital | null>{
                const result = await prisma.item_Capital.findFirst({
                    where: {
                        id_itemCapital
                    }
                });
                return result;
            }
        
        async findAll(): Promise<Item_Capital[]> {
                    return prisma.item_Capital.findMany()
        }        

        async delete(id_itemCapital: number): Promise<Item_Capital | null> {
            const result = await prisma.item_Capital.delete({
                where: { id_itemCapital }
            });
                
             return result;
            }
}

export { ItemCapitalRepoPrisma };