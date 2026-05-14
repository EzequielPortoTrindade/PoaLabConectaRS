import { tipo_usuario } from "@prisma/client";
import { Escola } from "./school.interface.js";

export interface Usuario {
    id: number;
    nome: string;
    email: string;
    senha: string;
    tipo: tipo_usuario;
    id_escola: number;
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
}