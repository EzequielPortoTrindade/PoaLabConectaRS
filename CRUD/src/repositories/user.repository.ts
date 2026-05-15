import { Usuario, UserCreate, UserRepository } from "../interfaces/user.interface.js";

class UserRepoPrisma implements UserRepository{
    async create(data: UserCreate): Promise<Usuario> {}
}

export { UserRepoPrisma };