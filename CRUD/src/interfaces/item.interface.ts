//import { tipo_categoria } from "@prisma/client";
import { Escola } from "./school.interface.js";
import { Fornecedor } from "./supplier.interface.js";

export enum tipo_categoria {
    capital,
    consumo
}

export interface Item {
    id: number;
    quantidade: number;
    nome: number;
    categoria: tipo_categoria;
    descricao?: string
    id_escola: number;
    id_fornecedor: number;
    escola?: Escola;
    fornecedor?: Fornecedor;
}

export interface ItemCreate {
    id: number;
    quantidade: number;
    nome: number;
    categoria: tipo_categoria;
    descricao?: string
    id_escola: number;
    id_fornecedor: number;
}

export interface ItemRepository {
    create(data: ItemCreate): Promise<Item>;
}