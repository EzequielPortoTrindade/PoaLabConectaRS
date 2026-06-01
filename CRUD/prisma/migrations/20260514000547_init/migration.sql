/*
  Warnings:

  - You are about to drop the `LogSaida` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `fornecedorId` on the `Compra` table. All the data in the column will be lost.
  - You are about to drop the column `itemId` on the `Compra` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `Compra` table. All the data in the column will be lost.
  - You are about to drop the column `localizacaoId` on the `Fornecedor` table. All the data in the column will be lost.
  - You are about to drop the column `localizacaoId` on the `Usuario` table. All the data in the column will be lost.
  - Added the required column `id_escola` to the `Compra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_fornecedor` to the `Compra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_item` to the `Compra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_usuario` to the `Compra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_escola` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_fornecedor` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uf` to the `Localizacao` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "LogSaida";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Escola" (
    "id_escola" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "rua" TEXT,
    "numero" INTEGER,
    "bairro" TEXT,
    "id_localizacao" INTEGER NOT NULL,
    CONSTRAINT "Escola_id_localizacao_fkey" FOREIGN KEY ("id_localizacao") REFERENCES "Localizacao" ("id_localizacao") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Log_Saidas" (
    "id_log" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT NOT NULL,
    "data_saida" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_usuario" INTEGER NOT NULL,
    "id_item" INTEGER NOT NULL,
    "id_escola" INTEGER NOT NULL,
    CONSTRAINT "Log_Saidas_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Log_Saidas_id_item_fkey" FOREIGN KEY ("id_item") REFERENCES "Item" ("id_item") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Log_Saidas_id_escola_fkey" FOREIGN KEY ("id_escola") REFERENCES "Escola" ("id_escola") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Compra" (
    "id_compra" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantidade" INTEGER NOT NULL,
    "data_compra" DATETIME NOT NULL,
    "valor_unitario" REAL NOT NULL,
    "marca" TEXT NOT NULL,
    "nota_fiscal" TEXT NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "id_fornecedor" INTEGER NOT NULL,
    "id_item" INTEGER NOT NULL,
    "id_escola" INTEGER NOT NULL,
    CONSTRAINT "Compra_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Compra_id_fornecedor_fkey" FOREIGN KEY ("id_fornecedor") REFERENCES "Fornecedor" ("id_fornecedor") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Compra_id_item_fkey" FOREIGN KEY ("id_item") REFERENCES "Item" ("id_item") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Compra_id_escola_fkey" FOREIGN KEY ("id_escola") REFERENCES "Escola" ("id_escola") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Compra" ("data_compra", "id_compra", "marca", "nota_fiscal", "quantidade", "valor_unitario") SELECT "data_compra", "id_compra", "marca", "nota_fiscal", "quantidade", "valor_unitario" FROM "Compra";
DROP TABLE "Compra";
ALTER TABLE "new_Compra" RENAME TO "Compra";
CREATE TABLE "new_Fornecedor" (
    "id_fornecedor" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cnpj" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "website" TEXT,
    "id_localizacao" INTEGER,
    CONSTRAINT "Fornecedor_id_localizacao_fkey" FOREIGN KEY ("id_localizacao") REFERENCES "Localizacao" ("id_localizacao") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Fornecedor" ("cnpj", "email", "id_fornecedor", "nome", "telefone", "website") SELECT "cnpj", "email", "id_fornecedor", "nome", "telefone", "website" FROM "Fornecedor";
DROP TABLE "Fornecedor";
ALTER TABLE "new_Fornecedor" RENAME TO "Fornecedor";
CREATE TABLE "new_Item" (
    "id_item" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantidade" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "descricao" TEXT,
    "id_escola" INTEGER NOT NULL,
    "id_fornecedor" INTEGER NOT NULL,
    CONSTRAINT "Item_id_escola_fkey" FOREIGN KEY ("id_escola") REFERENCES "Escola" ("id_escola") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Item_id_fornecedor_fkey" FOREIGN KEY ("id_fornecedor") REFERENCES "Fornecedor" ("id_fornecedor") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("categoria", "descricao", "id_item", "nome", "quantidade") SELECT "categoria", "descricao", "id_item", "nome", "quantidade" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE TABLE "new_Localizacao" (
    "id_localizacao" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome_cidade" TEXT NOT NULL,
    "uf" TEXT NOT NULL
);
INSERT INTO "new_Localizacao" ("id_localizacao", "nome_cidade") SELECT "id_localizacao", "nome_cidade" FROM "Localizacao";
DROP TABLE "Localizacao";
ALTER TABLE "new_Localizacao" RENAME TO "Localizacao";
CREATE TABLE "new_Usuario" (
    "id_usuario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "id_localizacao" INTEGER,
    "id_escola" INTEGER,
    CONSTRAINT "Usuario_id_localizacao_fkey" FOREIGN KEY ("id_localizacao") REFERENCES "Localizacao" ("id_localizacao") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Usuario_id_escola_fkey" FOREIGN KEY ("id_escola") REFERENCES "Escola" ("id_escola") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Usuario" ("email", "id_usuario", "nome", "senha", "tipo") SELECT "email", "id_usuario", "nome", "senha", "tipo" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
