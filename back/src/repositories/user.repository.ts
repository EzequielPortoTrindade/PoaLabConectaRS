import { prisma } from "../db/prisma-client.js";
import { Usuario, UserCreate, UserRepository } from "../../../shared/user.interface.js";
import { TipoUsuario } from "@prisma/client";

class UserRepoPrisma implements UserRepository {

    async create(data: UserCreate): Promise<Usuario> {
        const result = await prisma.usuario.create({
            data: {
                nome: data.nome,
                email: data.email,
                senha: data.senha,
                tipo: data.tipo as TipoUsuario,
                id_escola: data.id_escola
            }
        });

        return result;
    }

    async findByEmail(email: string): Promise<Usuario | null> {
        return prisma.usuario.findFirst({
            where: { email }
        });
    }

    async findById(id_usuario: number): Promise<Usuario | null> {
        return prisma.usuario.findFirst({
            where: { id_usuario }
        });
    }

    async findAll(): Promise<Usuario[]> {
        return prisma.usuario.findMany();
    }

    async delete(id_usuario: number): Promise<Usuario | null> {
        return prisma.usuario.delete({
            where: { id_usuario }
        });
    }
}

export { UserRepoPrisma };