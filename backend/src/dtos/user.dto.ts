export type UserDTO = {
  id: string
  nome: string
  email: string
  tipo: string
  id_escola?: number | null
}

export type CreateUserDTO = {
  nome: string
  email: string
  tipo: string
  id_escola?: number
}