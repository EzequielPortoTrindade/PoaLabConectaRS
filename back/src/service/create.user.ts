import type { UsersRepository } from "../repositories/interfaces/user.repo.js"

export class CreateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(data: any) {
    const userExists = await this.usersRepository.findByEmail(data.email)

    if (userExists) {
      throw new Error("User already exists")
    }

    return this.usersRepository.create(data)
  }
}