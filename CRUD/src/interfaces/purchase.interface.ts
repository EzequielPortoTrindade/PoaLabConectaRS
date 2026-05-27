import { Decimal } from "@prisma/client/runtime/library";

import { Item_Consumo } from "./consumo.interface.js";
import { Item_Capital } from "./capital.interface.js";
import { Fornecedor } from "./supplier.interface.js";
import { Usuario } from "./user.interface.js";

export interface Compra {
    id_compra: number;
    quantidade: number;
    data_compra: Date;
    valor_unitario: Decimal;
    marca: string;
    nota_fiscal: string;
    id_usuario: number;
    id_fornecedor: number;
    id_itemCapital: number;
    id_itemConsumo: number;
    id_escola: number;

    usuario?: Usuario;
    fornecedor?: Fornecedor;
    item_capital?: Item_Capital;
    item_consumo?: Item_Consumo;
}

export interface CompraCreate {
    quantidade: number;
    data_compra: Date;
    valor_unitario: Decimal;
    marca: string;
    nota_fiscal: string;
    id_usuario: number;
    id_fornecedor: number;
    id_itemConsumo: number;
    id_itemCapital: number;
    id_escola: number;
}

export interface CompraRepository {
    create(data: CompraCreate): Promise<Compra>;
    findById(id_compra: number): Promise<Compra | null>;
}