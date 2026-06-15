import { Item_Consumo } from "./consumo.interface.js";
import { Item_Capital } from "./capital.interface.js";
import { Escola } from "./school.interface.js";
import { Usuario } from "./user.interface.js";

export interface Saida {
    id_log: number;
    descricao: string;
    data_saida: Date;
    id_usuario: number;
    id_itemConsumo: number;
    id_itemCapital: number;
    id_escola: number;
    usuario?: Usuario;
    item_capital?: Item_Capital;
    item_consumo?: Item_Consumo;
    escola?: Escola;
}

export interface SaidaCreate {
    descricao: string;
    data_saida: Date;
    id_usuario: number;
    id_itemConsumo: number;
    id_itemCapital: number;
    id_escola: number;
}

export interface SaidaRepository {
    create(data: SaidaCreate): Promise<Saida>;
    findById(id_log: number): Promise<Saida | null>;
    delete(id_log: number): Promise<Saida | null>;
    findAll(): Promise<Saida[]>;
}