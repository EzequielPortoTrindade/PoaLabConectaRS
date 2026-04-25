-- =========================================
-- AUTOR: Talia Oliveira
-- As tabelas do banco de dados
-- =========================================

-- =====================
-- ENUMS
-- =====================

CREATE TYPE tipo_usuario AS ENUM ('admin', 'professor');
CREATE TYPE tipo_contato AS ENUM ('telefone', 'whatsapp');
CREATE TYPE tipo_categoria AS ENUM ('capital', 'custeio');
CREATE TYPE tipo_movimentacao_log AS ENUM ('entrada', 'saida');

-- =====================
-- TABELA LOCALIZACAO
-- =====================

CREATE TABLE localizacao (
    id_localizacao SERIAL PRIMARY KEY,
    nome_cidade VARCHAR(100) NOT NULL
);

-- =====================
-- TABELA ESCOLA
-- =====================

CREATE TABLE escola (
    id_escola SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    rua VARCHAR(100),
    numero INT,
    bairro VARCHAR(100),
    uf VARCHAR(2), -- ex: RS, SP
    id_localizacao INT,

    CONSTRAINT fk_escola_localizacao
        FOREIGN KEY (id_localizacao)
        REFERENCES localizacao(id_localizacao)
);

-- =====================
-- TABELA USUARIO
-- =====================

CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    tipo tipo_usuario NOT NULL,
    id_escola INT,

    CONSTRAINT fk_usuario_escola
        FOREIGN KEY (id_escola)
        REFERENCES escola(id_escola)
);

-- =====================
-- TABELA FORNECEDOR
-- =====================

CREATE TABLE fornecedor (
    id_fornecedor SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    endereco VARCHAR(150),
    website VARCHAR(100)
);

-- =====================
-- TABELA CONTATOS (para fornecedor)
-- =====================

CREATE TABLE contatos (
    id_contato SERIAL PRIMARY KEY,
    usuario_id INT,
    tipo tipo_contato NOT NULL,
    numero VARCHAR(20) NOT NULL,

    CONSTRAINT fk_contatos_fornecedor
        FOREIGN KEY (fornecedor_id)
        REFERENCES usuario(id_fornecedor)
);

-- =====================
-- TABELA TIPO (categoria de itens)
-- =====================

CREATE TABLE tipo (
    id_tipo SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    categoria tipo_categoria NOT NULL,
    descricao VARCHAR(150)
);

-- =====================
-- TABELA ITEM
-- =====================

CREATE TABLE item (
    id_item SERIAL PRIMARY KEY,
    quantidade INT NOT NULL,
    descricao VARCHAR(150),

    id_tipo INT,
    id_escola INT,

    CONSTRAINT fk_item_tipo
        FOREIGN KEY (id_tipo)
        REFERENCES tipo(id_tipo),

    CONSTRAINT fk_item_escola
        FOREIGN KEY (id_escola)
        REFERENCES escola(id_escola)
);

-- =====================
-- TABELA COMPRAS
-- =====================

CREATE TABLE compras (
    id_compras SERIAL PRIMARY KEY,
    id_item INT,
    id_fornecedor INT,
    id_escola INT,
    quantidade INT NOT NULL,
    data_compra DATE,
    valor_unitario NUMERIC(10,2),
    marca VARCHAR(40),
    nota_fiscal VARCHAR(50),

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
-- TABELA LOG DE MOVIMENTAÇÃO
-- =====================

CREATE TABLE log_movimentacao (
    id_log SERIAL PRIMARY KEY,
    id_item INT,
    id_usuario INT,
    tipo_movimentacao tipo_movimentacao_log NOT NULL,
    quantidade INT,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    motivo VARCHAR(150),

    CONSTRAINT fk_log_item
        FOREIGN KEY (id_item)
        REFERENCES item(id_item),

    CONSTRAINT fk_log_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuario(id_usuario)
);