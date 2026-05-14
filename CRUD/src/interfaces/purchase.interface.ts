import { Item } from "./item.interface.js";
import { Fornecedor } from "./supplier.interface.js";
import { Usuario } from "./user.interface.js";


export interface Compra{
    id: number;
    quantidade: number;
    valor_unitario: number;
    marca: string;
    nota_fiscal: string;
    id_usuario: number;
    id_fornecedor: number;
    id_item: number;
    usuario?: Usuario;
    fornecedor?: Fornecedor;
    item?: Item
}

export interface CompraCreate{
    quantidade: number;
    valor_unitario: number;
    marca: string;
    nota_fiscal: string;
    id_usuario: number;
    id_fornecedor: number;
    id_item: number;
}

export interface CompraRepository{
    create(data: CompraCreate): Promise<Compra>;
}