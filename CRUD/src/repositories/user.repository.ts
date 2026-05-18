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
    //async find(data:) {}
}

export { UserRepoPrisma };