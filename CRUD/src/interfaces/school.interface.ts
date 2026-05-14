import { Localizacao } from "./local.interface.js";

export interface Escola {
    id: number;
    nome: string;
    rua?: string;
    numero?: number;
    bairro?: string;
    id_localizacao: number;
    localizacao?: Localizacao;
}

export interface EscolaCreate {
    nome: string;
    rua?: string;
    numero?: number;
    bairro?: string;
    id_localizacao: number;
}

export interface EscolaRepository {
    create(data: EscolaCreate): Promise<Escola>;
}