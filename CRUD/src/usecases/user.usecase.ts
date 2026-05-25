import { Usuario, UserCreate, UserRepository } from "../interfaces/user.interface.js";
import { UserRepoPrisma } from "../repositories/user.repository.js";

class UserUseCase {
    
    private userRepo: UserRepository

    constructor(){
        this.userRepo = new UserRepoPrisma()
    }

    async create({
        nome, 
        email, 
        senha, 
        tipo, 
        id_escola
        }: UserCreate): Promise<Usuario>{

        const verifyIfUserExists = await this.userRepo.findByEmail(email);

        if(verifyIfUserExists) {
            throw new Error('User already exists');
        }

        const result = await this.userRepo.create({nome, email, senha, tipo, id_escola});
        
        return result;

    }

    async delete(id_usuario: number): Promise<Usuario> {
            const deleted = await this.userRepo.delete(id_usuario);
    
            if (!deleted) {
                throw new Error("User not found");
            }
    
            return deleted;
        }
};

export { UserUseCase };