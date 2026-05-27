import { tipo_usuario } from "@prisma/client";
import { prisma } from "../db/prisma-client.js";
import { Usuario, UserCreate, UserRepository } from "../interfaces/user.interface.js";

class UserRepoPrisma implements UserRepository{
    async create(data: UserCreate): Promise<Usuario> {
        const result = await prisma.usuario.create({
            data: {
                nome: data.nome,
                email: data.email,
                senha: data.senha,
                tipo: data.tipo as tipo_usuario,
                id_escola: data.id_escola
            }
        });
        return result;
    }

    async findByEmail(email: string): Promise<Usuario | null>{
        const result = await prisma.usuario.findFirst({
            where: {
                email
            }
        });
        return result || null;
    }

    async findById(id_usuario: number): Promise<Usuario | null>{
        const result = await prisma.usuario.findFirst({
            where: {
               id_usuario 
            }
        });
        return result || null;
    }

    async delete(id_usuario: number): Promise<Usuario | null> {
            const exists = await prisma.usuario.findFirst({
                where: { id_usuario }
            });
    
            if (!exists) return null;
    
            const result = await prisma.usuario.delete({
                where: { id_usuario }
            });
    
            return result;
        }
}

export { UserRepoPrisma };