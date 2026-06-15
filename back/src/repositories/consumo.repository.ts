import { prisma } from "../db/prisma-client.js";
import { Item_Consumo, ItemConsumoCreate, ItemConsumoRepository } from "../interfaces/consumo.interface.js";

class ItemConsumoRepoPrisma implements ItemConsumoRepository{
    async create(data: ItemConsumoCreate): Promise<Item_Consumo> {
            const result = await prisma.item_Consumo.create({
                data: {
                    quantidade: data.quantidade,
                    nome: data.nome,
                    descricao: data.descricao,
                    id_escola: data.id_escola,
                    id_fornecedor: data.id_fornecedor
                    }
                });
            return result;
        }
    
        async findByName(nome: string): Promise<Item_Consumo | null>{
            const result = await prisma.item_Consumo.findFirst({
               where: {
                nome
               } 
            });
            return result;
        }

        async findById(id_itemConsumo: number): Promise<Item_Consumo | null>{
                const result = await prisma.item_Consumo.findFirst({
                    where: {
                        id_itemConsumo
                    }
                });
                return result;
            }
        
        async findAll(): Promise<Item_Consumo[]> {
                return prisma.item_Consumo.findMany()
            }   

        async delete(id_itemConsumo: number): Promise<Item_Consumo | null> {
                
             const result = await prisma.item_Consumo.delete({
                 where: { id_itemConsumo }
            });
                
            return result;
        }
}

export { ItemConsumoRepoPrisma };