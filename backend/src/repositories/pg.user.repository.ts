/*import { pool } from '../database'
import { userMapper } from '../mappers/user.mapper'
import { CreateUserDTO } from '../dtos/user.dto'

export class PgUsersRepository {
  async getAll() {
    const result = await pool.query('SELECT * FROM usuario')
    return result.rows.map(userMapper.fromPostgres)
  }

  async getById(id: string) {
    const result = await pool.query(
      'SELECT * FROM usuario WHERE id_usuario = $1',
      [Number(id)]
    )

    const user = result.rows[0]
    return user ? userMapper.fromPostgres(user) : null
  }

  async create(data: CreateUserDTO) {
    const { nome, email, tipo, id_escola } = data

    const result = await pool.query(
      `INSERT INTO usuario (nome, email, tipo, id_escola)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [nome, email, tipo, id_escola || null]
    )

    return userMapper.fromPostgres(result.rows[0])
  }
}*/