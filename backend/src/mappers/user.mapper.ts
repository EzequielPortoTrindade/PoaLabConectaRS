import { UserDTO } from '../dtos/user.dto'

export const userMapper = {
  fromMongo(doc: any): UserDTO {
    return {
      id: doc._id.toString(),
      nome: doc.nome,
      email: doc.email,
      tipo: doc.tipo,
      id_escola: doc.id_escola ?? null
    }
  },

  fromPostgres(row: any): UserDTO {
    return {
      id: String(row.id_usuario),
      nome: row.nome,
      email: row.email,
      tipo: row.tipo,
      id_escola: row.id_escola
    }
  }
}