import { prisma } from "../../db/index.js"
import type { tipo_usuario } from "@prisma/client"

import type {
  UsersRepository,
  CreateUserData,
} from "../interfaces/user.repo.js"

export class PrismaUsersRepository
  implements UsersRepository
{
  async findByEmail(email: string) {
    return prisma.usuario.findUnique({
      where: {
        email,
      },
    })
  }

  async create(data: CreateUserData) {
    return prisma.usuario.create({
      data: {
        nome: data.nome,
        email: data.email,
        password: data.password,
        tipo: data.tipo_usuario,

        ...(data.id_escola !== undefined && {
          escola: {
            connect: {
              id_escola: data.id_escola,
            },
          },
        }),
      },
    })
  }
}