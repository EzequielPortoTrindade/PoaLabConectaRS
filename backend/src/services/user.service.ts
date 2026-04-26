// src/services/usersService.ts

import { UsersRepository } from '../repositories/user.repository'
import { CreateUserDTO } from '../dtos/user.dto'

export class UsersService {
  constructor(private repo: UsersRepository) {}

  getUsers() {
    return this.repo.getAll()
  }

  getUserById(id: string) {
    return this.repo.getById(id)
  }

  createUser(data: CreateUserDTO) {
    return this.repo.create(data)
  }
}