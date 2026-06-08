export interface Localizacao {
    id_localizacao: number;
    nome_cidade: string;
    uf: string;
}

export interface LocalCreate {
    nome_cidade: string;
    uf: string;
}

export interface LocalRepository {
    create(data: LocalCreate): Promise<Localizacao>;
    findByNameAndUF(nome_cidade: string, uf: string): Promise<Localizacao | null>;
    findById(id_localizacao: number): Promise<Localizacao | null>;
    delete(id_localizacao: number): Promise<Localizacao>;
}