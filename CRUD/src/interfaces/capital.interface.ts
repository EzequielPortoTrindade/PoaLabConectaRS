import { Escola } from "./school.interface.js";
import { Fornecedor } from "./supplier.interface.js";

export interface Item_Capital {
    id_itemCapital: number;
    nome: string;
    descricao: string | null;
    id_escola: number;
    id_fornecedor: number;
    num_patrimonio: string;
    escola?: Escola;
    fornecedor?: Fornecedor;
}

export interface ItemCapitalCreate {
    nome: string;
    descricao: string;
    num_patrimonio: string;
    id_escola: number;
    id_fornecedor: number;
}

export interface ItemCapitalRepository {
    create(data: ItemCapitalCreate): Promise<Item_Capital>;
    findByNumPatrimonio(num_patrimonio: string): Promise<Item_Capital | null>;
}