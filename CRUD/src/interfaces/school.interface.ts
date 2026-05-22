import { Localizacao } from "./local.interface.js";

export interface Escola {
    id_escola: number;
    nome: string;
    rua: string | null;
    numero: number | null;
    bairro: string | null;
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
    findByName(nome: string): Promise<Escola | null>;
}