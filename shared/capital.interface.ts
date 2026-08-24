export interface Item_Capital{
    nome: string;
    tipo: string;
    n_patrimonio: string;
    n_serie: string;
    descricao: string;
    estado: string;
    modelo: string;
}

export interface ItemCapitalCreate{
    nome: string;
    tipo: string;
    n_patrimonio: string;
    n_serie: string;
    descricao: string;
    estado: string;
    modelo: string;
}

export interface ItemCapitalRepository{
    create(data: ItemCapitalCreate): Promise<Item_Capital>;
    findByNumPatrimonio(n_patrimonio: string): Promise<Item_Capital>;
    findById(id_itemCapital: number): Promise<Item_Capital | null>;
    delete(id_itemCapital: number): Promise<Item_Capital | null>;
    findAll(): Promise<Item_Capital[]>;
}