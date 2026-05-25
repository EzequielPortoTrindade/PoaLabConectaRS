import { Item } from "./item.interface.js";
import { Fornecedor } from "./supplier.interface.js";
import { Usuario } from "./user.interface.js";


export interface Compra{
    id_compra: number;
    quantidade: number;
    data_compra: Date;
    valor_unitario: number;
    marca: string;
    nota_fiscal: string;
    id_usuario: number;
    id_fornecedor: number;
    id_item: number;
    id_escola: number;
    usuario?: Usuario;
    fornecedor?: Fornecedor;
    item?: Item
}

export interface CompraCreate{
    quantidade: number;
    data_compra: Date;
    valor_unitario: number;
    marca: string;
    nota_fiscal: string;
    id_usuario: number;
    id_fornecedor: number;
    id_item: number;
    id_escola: number;
}

export interface CompraRepository{
    create(data: CompraCreate): Promise<Compra>;
    findById(id_compra: number): Promise<Compra | null>;
}