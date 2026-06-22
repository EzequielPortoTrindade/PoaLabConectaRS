import { Escola } from "./school.interface.js";
import { Fornecedor } from "./supplier.interface.js";

export interface Item_Consumo {
    id_itemConsumo: number;
    quantidade: number;
    nome: string;
    descricao: string | null;
    id_escola: number;
    id_fornecedor: number;
    escola?: Escola;
    fornecedor?: Fornecedor;
}

export interface ItemConsumoCreate {
    quantidade: number;
    nome: string;
    descricao?: string;
    id_escola: number;
    id_fornecedor: number;
}

export interface ItemConsumoRepository {
    create(data: ItemConsumoCreate): Promise<Item_Consumo>;
    findByName(nome: string): Promise<Item_Consumo | null>;
    findById(id_itemConsumo: number): Promise<Item_Consumo | null>;
    delete(id_itemConsumo: number): Promise<Item_Consumo | null>;
    findAll(): Promise<Item_Consumo[]>;
}