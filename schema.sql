-- =========================================
-- AUTOR: Talia Oliveira
-- As tabelas do banco de dados
-- =========================================


-- =====================
-- SELECT
-- =====================
select * from localizacao;



-- =====================
-- INSERT
-- =====================

INSERT INTO localizacao (nome_cidade, uf)
VALUES ('São Paulo', 'SP');



-- =====================
-- DROPS
-- =====================
DROP TABLE localizacao;
DROP TABLE escola; 


-- =====================
-- DROPS CASCATA
-- =====================

DROP TABLE localizacao CASCADE; 

-- =====================
-- ENUMS
-- =====================

CREATE TYPE tipo_usuario AS ENUM ('admin', 'professor');
CREATE TYPE tipo_categoria AS ENUM ('capital', 'consumo');

-- =====================
-- TABELA LOCALIZACAO
-- =====================

CREATE TABLE localizacao (
    id_localizacao INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome_cidade VARCHAR(100) NOT NULL,
	uf VARCHAR(2) -- ex: RS, SP
);

-- =====================
-- TABELA ESCOLA
-- =====================

CREATE TABLE escola (
    id_escola INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    rua VARCHAR(100),
    numero INT,
    bairro VARCHAR(100),

    id_localizacao INTEGER, 
	
    CONSTRAINT fk_escola_localizacao
        FOREIGN KEY (id_localizacao)
        REFERENCES localizacao(id_localizacao)
);

-- =====================
-- TABELA USUARIO
-- =====================

CREATE TABLE usuario (
    id_usuario INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    tipo tipo_usuario NOT NULL,

	 id_escola INTEGER, 

    CONSTRAINT fk_usuario_escola
        FOREIGN KEY (id_escola)
        REFERENCES escola(id_escola)
);

-- =====================
-- TABELA FORNECEDOR
-- =====================

CREATE TABLE fornecedor (
    id_fornecedor INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    CNPJ VARCHAR(18) NOT NULL,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20) NOT NULL, 
    email VARCHAR(150)  NOT NULL,
    website VARCHAR(150)

	 id_fornecedor INTEGER, 
	 
     CONSTRAINT fk_localizacao_fornecedor
        FOREIGN KEY (id_localizacao)
        REFERENCES localizacao(id_localizacao)
);

-- =====================
-- TABELA ITEM
-- =====================

CREATE TABLE item (
    id_item INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    quantidade INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
	numero_patrimonio TEXT[],
    categoria tipo_categoria NOT NULL,
    descricao VARCHAR(150),
	
	id_escola INTEGER, 
	id_fornecedor INTEGER, 
	
    CONSTRAINT fk_item_escola
        FOREIGN KEY (id_escola)
        REFERENCES escola(id_escola),

    CONSTRAINT fk_item_fornecedor
        FOREIGN KEY (id_fornecedor)
        REFERENCES fornecedor(id_fornecedor)
);

-- =====================
-- TABELA COMPRAS
-- =====================
--entrada
CREATE TABLE compras (
    id_compra INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    quantidade INT NOT NULL,
    data_compra DATE,
    valor_unitario NUMERIC(10,2),
    marca VARCHAR(40),
    nota_fiscal VARCHAR(50),
	
	 id_item INTEGER, 
	 id_escolas INTEGER,
	 id_fornecedor INTEGER, 
	 
    CONSTRAINT fk_compras_item
        FOREIGN KEY (id_item)
        REFERENCES item(id_item),

    CONSTRAINT fk_compras_escola
        FOREIGN KEY (id_escola)
        REFERENCES escola(id_escola),

    CONSTRAINT fk_compras_fornecedor
        FOREIGN KEY (id_fornecedor)
        REFERENCES fornecedor(id_fornecedor)
);

-- =====================
-- TABELA LOG DE SAIDA
-- =====================
CREATE TABLE log_saida (
    id_log INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    quantidade INT NOT NULL,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	
    id_item INTEGER, 
	id_usuario INTEGER, 
	
    CONSTRAINT fk_log_item
        FOREIGN KEY (id_item)
        REFERENCES item(id_item),

    CONSTRAINT fk_log_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuario(id_usuario)
);
