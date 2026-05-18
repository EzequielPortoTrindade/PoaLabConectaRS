import { Usuario, UserCreate, UserRepository } from "../interfaces/user.interface.js";
import { UserRepoPrisma } from "../repositories/user.repository.js";

class UserUseCase {
    private userRepo: UserRepository
    constructor(){
        this.userRepo = new UserRepoPrisma()
    }

    async create({nome, email, senha, tipo, id_escola}: UserCreate): Promise<Usuario>{
        const result = await this.userRepo.create({nome, email, senha, tipo, id_escola});
        return result;
    }
}

export { UserUseCase };