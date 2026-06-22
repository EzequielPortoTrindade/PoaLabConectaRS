import bcrypt from "bcryptjs"
import {
  Usuario,
  UserCreate,
  UserRepository,
} from "../../../shared/user.interface.js"

class UserUseCase {
  constructor(private userRepo: UserRepository) {}

  async create({
    nome,
    email,
    senha,
    tipo,
    id_escola,
  }: UserCreate): Promise<Usuario> {
    const verifyIfUserExists = await this.userRepo.findByEmail(email)

    if (verifyIfUserExists) {
      throw new Error("User already exists")
    }

    const hashedPassword = await bcrypt.hash(senha, 10)

    return await this.userRepo.create({
      nome,
      email,
      senha: hashedPassword,
      tipo,
      id_escola,
    })
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return await this.userRepo.findByEmail(email)
  }

  async findById(id_usuario: number): Promise<Usuario | null> {
    return await this.userRepo.findById(id_usuario)
  }

  async findAll(): Promise<Usuario[]> {
    return this.userRepo.findAll()
  }

  async delete(id_usuario: number): Promise<Usuario | null> {
    const userExists = await this.userRepo.findById(id_usuario)

    if (!userExists) {
      throw new Error("User not found")
    }

    return await this.userRepo.delete(id_usuario)
  }
}

export { UserUseCase }