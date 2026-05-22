import { Localizacao } from "./local.interface.js";

export interface Fornecedor {
    id_fornecedor: number;
    cnpj: string;
    nome: string;
    telefone: string;
    email: string;
    website: string | null;
    id_localizacao: number | null;
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
    findByCNPJ(cnpj: string): Promise<Fornecedor | null>;
}