import { Item } from "./item.interface.js";
import { Escola } from "./school.interface.js";
import { Usuario } from "./user.interface.js";

export interface Saida {
    id: number;
    descricao: string;
    data_saida: Date;
    id_usuario: number;
    id_item: number;
    id_escola: number;
    usuario?: Usuario;
    item?: Item;
    escola?: Escola;
}

export interface SaidaCreate {
    id: number;
    descricao: string;
    data_saida: Date;
    id_usuario: number;
    id_item: number;
    id_escola: number;
}

export interface SaidaRepository {
    create(data: SaidaCreate): Promise<Saida>;
}