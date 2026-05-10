export interface CreateUserData {
  nome: string
  email: string
  password: string
  tipo: "ADMIN" | "USUARIO"
  id_escola?: number
}

export interface UsersRepository {
  findByEmail(email: string): Promise<any>
  create(data: CreateUserData): Promise<any>
}