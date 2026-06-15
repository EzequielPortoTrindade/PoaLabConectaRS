/*
  Warnings:

  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `id_item` on the `Compra` table. All the data in the column will be lost.
  - You are about to drop the column `id_item` on the `Log_Saidas` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cnpj]` on the table `Fornecedor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_itemCapital` to the `Compra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_itemConsumo` to the `Compra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_itemCapital` to the `Log_Saidas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_itemConsumo` to the `Log_Saidas` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Item";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Item_Consumo" (
    "id_itemConsumo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantidade" INTEGER NOT NULL DEFAULT 0,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "id_escola" INTEGER NOT NULL,
    "id_fornecedor" INTEGER NOT NULL,
    CONSTRAINT "Item_Consumo_id_escola_fkey" FOREIGN KEY ("id_escola") REFERENCES "Escola" ("id_escola") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Item_Consumo_id_fornecedor_fkey" FOREIGN KEY ("id_fornecedor") REFERENCES "Fornecedor" ("id_fornecedor") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Item_Capital" (
    "id_itemCapital" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "num_patrimonio" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "id_escola" INTEGER NOT NULL,
    "id_fornecedor" INTEGER NOT NULL,
    CONSTRAINT "Item_Capital_id_escola_fkey" FOREIGN KEY ("id_escola") REFERENCES "Escola" ("id_escola") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Item_Capital_id_fornecedor_fkey" FOREIGN KEY ("id_fornecedor") REFERENCES "Fornecedor" ("id_fornecedor") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Compra" (
    "id_compra" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantidade" INTEGER NOT NULL,
    "data_compra" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valor_unitario" REAL NOT NULL,
    "marca" TEXT NOT NULL,
    "nota_fiscal" TEXT NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "id_fornecedor" INTEGER NOT NULL,
    "id_itemConsumo" INTEGER NOT NULL,
    "id_itemCapital" INTEGER NOT NULL,
    "id_escola" INTEGER NOT NULL,
    CONSTRAINT "Compra_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Compra_id_fornecedor_fkey" FOREIGN KEY ("id_fornecedor") REFERENCES "Fornecedor" ("id_fornecedor") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Compra_id_itemConsumo_fkey" FOREIGN KEY ("id_itemConsumo") REFERENCES "Item_Consumo" ("id_itemConsumo") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Compra_id_itemCapital_fkey" FOREIGN KEY ("id_itemCapital") REFERENCES "Item_Capital" ("id_itemCapital") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Compra_id_escola_fkey" FOREIGN KEY ("id_escola") REFERENCES "Escola" ("id_escola") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Compra" ("data_compra", "id_compra", "id_escola", "id_fornecedor", "id_usuario", "marca", "nota_fiscal", "quantidade", "valor_unitario") SELECT "data_compra", "id_compra", "id_escola", "id_fornecedor", "id_usuario", "marca", "nota_fiscal", "quantidade", "valor_unitario" FROM "Compra";
DROP TABLE "Compra";
ALTER TABLE "new_Compra" RENAME TO "Compra";
CREATE TABLE "new_Log_Saidas" (
    "id_log" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT NOT NULL,
    "data_saida" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_usuario" INTEGER NOT NULL,
    "id_itemConsumo" INTEGER NOT NULL,
    "id_itemCapital" INTEGER NOT NULL,
    "id_escola" INTEGER NOT NULL,
    CONSTRAINT "Log_Saidas_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Log_Saidas_id_itemConsumo_fkey" FOREIGN KEY ("id_itemConsumo") REFERENCES "Item_Consumo" ("id_itemConsumo") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Log_Saidas_id_itemCapital_fkey" FOREIGN KEY ("id_itemCapital") REFERENCES "Item_Capital" ("id_itemCapital") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Log_Saidas_id_escola_fkey" FOREIGN KEY ("id_escola") REFERENCES "Escola" ("id_escola") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Log_Saidas" ("data_saida", "descricao", "id_escola", "id_log", "id_usuario") SELECT "data_saida", "descricao", "id_escola", "id_log", "id_usuario" FROM "Log_Saidas";
DROP TABLE "Log_Saidas";
ALTER TABLE "new_Log_Saidas" RENAME TO "Log_Saidas";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Fornecedor_cnpj_key" ON "Fornecedor"("cnpj");
