import { Localizacao } from "./local.interface.js";

export interface Fornecedor {
    id: number;
    cnpj: string;
    nome: string;
    telefone: string;
    email: string;
    website?: string;
    id_localizacao: number;
    localizacao?: Localizacao;
}

export interface FornecedorCreate {
    cnpj: string;
    nome: string;
    telefone: string;
    email: string;
    website?: string;
    id_localizacao: number;
}

export interface FornecedorRepository {
    create(data: FornecedorCreate): Promise<Fornecedor>;
}