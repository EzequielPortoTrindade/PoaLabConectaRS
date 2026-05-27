import { tipo_usuario } from "@prisma/client";
import { Escola } from "./school.interface.js";

export interface Usuario {
    id_usuario: number;
    nome: string;
    email: string;
    senha: string;
    tipo: tipo_usuario;
    id_escola: number | null;
    escola?: Escola;
}

export interface UserCreate {
    nome: string;
    email: string;
    senha: string;
    tipo: tipo_usuario;
    id_escola: number;
}

export interface UserRepository {
    create(data: UserCreate): Promise<Usuario>;
    findByEmail(email: string): Promise<Usuario | null>;
    findById(id_usuario: number): Promise<Usuario | null>;
    delete(id_usuario: number): Promise<Usuario>;
}