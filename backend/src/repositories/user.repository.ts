export interface UsersRepository {
  getAll(): Promise<any[]>
  getById(id: string | number): Promise<any | null>
  create(data: {
    nome: string
    email: string
    tipo: string
    id_escola?: number
  }): Promise<any>
}