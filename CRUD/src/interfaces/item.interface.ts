import { tipo_categoria } from "@prisma/client";
import { Escola } from "./school.interface.js";
import { Fornecedor } from "./supplier.interface.js";

export interface Item {
    id_item: number;
    quantidade: number;
    nome: string;
    categoria: tipo_categoria;
    descricao: string | null;
    id_escola: number;
    id_fornecedor: number;
    num_patrimonio?: string[];
    escola?: Escola;
    fornecedor?: Fornecedor;
}

export interface ItemCreate {
    quantidade: number;
    nome: string;
    categoria: tipo_categoria;
    descricao?: string;
    id_escola: number;
    id_fornecedor: number;
    num_patrimonio?: string[];
}

export interface ItemRepository {
    create(data: ItemCreate): Promise<Item>;
    findByName(nome: string): Promise<Item | null>;
}