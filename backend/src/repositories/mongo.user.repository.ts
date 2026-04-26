// src/repositories/mongoUsersRepository.ts

import { UserModel } from '../models/user.model'
import { userMapper } from '../mappers/user.mapper'
import { CreateUserDTO } from '../dtos/user.dto'

export class MongoUsersRepository {
  async getAll() {
    const users = await UserModel.find()
    return users.map(userMapper.fromMongo)
  }

  async getById(id: string) {
    const user = await UserModel.findById(id)
    return user ? userMapper.fromMongo(user) : null
  }

  async create(data: CreateUserDTO) {
    const user = await UserModel.create(data)
    return userMapper.fromMongo(user)
  }
}