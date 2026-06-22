/*
  Warnings:

  - You are about to drop the column `emprestimo` on the `Item_Capital` table. All the data in the column will be lost.
  - You are about to drop the column `emprestimo` on the `Item_Consumo` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item_Capital" (
    "id_itemCapital" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "num_patrimonio" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "id_escola" INTEGER NOT NULL,
    "id_fornecedor" INTEGER NOT NULL,
    CONSTRAINT "Item_Capital_id_escola_fkey" FOREIGN KEY ("id_escola") REFERENCES "Escola" ("id_escola") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Item_Capital_id_fornecedor_fkey" FOREIGN KEY ("id_fornecedor") REFERENCES "Fornecedor" ("id_fornecedor") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Item_Capital" ("descricao", "id_escola", "id_fornecedor", "id_itemCapital", "nome", "num_patrimonio") SELECT "descricao", "id_escola", "id_fornecedor", "id_itemCapital", "nome", "num_patrimonio" FROM "Item_Capital";
DROP TABLE "Item_Capital";
ALTER TABLE "new_Item_Capital" RENAME TO "Item_Capital";
CREATE TABLE "new_Item_Consumo" (
    "id_itemConsumo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantidade" INTEGER NOT NULL DEFAULT 0,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "id_escola" INTEGER NOT NULL,
    "id_fornecedor" INTEGER NOT NULL,
    CONSTRAINT "Item_Consumo_id_escola_fkey" FOREIGN KEY ("id_escola") REFERENCES "Escola" ("id_escola") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Item_Consumo_id_fornecedor_fkey" FOREIGN KEY ("id_fornecedor") REFERENCES "Fornecedor" ("id_fornecedor") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Item_Consumo" ("descricao", "id_escola", "id_fornecedor", "id_itemConsumo", "nome", "quantidade") SELECT "descricao", "id_escola", "id_fornecedor", "id_itemConsumo", "nome", "quantidade" FROM "Item_Consumo";
DROP TABLE "Item_Consumo";
ALTER TABLE "new_Item_Consumo" RENAME TO "Item_Consumo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
