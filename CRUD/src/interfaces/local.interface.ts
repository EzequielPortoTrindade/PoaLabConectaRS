export interface Localizacao {
    id: number;
    nome_cidade: string;
    uf: string;
}

export interface LocalCreate {
    nome_cidade: string;
    uf: string;
}

export interface LocalRepository {
    create(data: LocalCreate): Promise<Localizacao>;
}