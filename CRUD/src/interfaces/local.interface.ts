export interface Localizacao {
    id: number;
    nome_cidade: string;
    uf: string;

    // fornecedores: Fornecedor[];
    // usuarios: Usuario[];
    // escolas: Escola[];
}

export interface LocalCreate {
    nome_cidade: string;
    uf: string;
}

export interface LocalRepository {
    create(data: Localizacao): Promise<Localizacao>;
}