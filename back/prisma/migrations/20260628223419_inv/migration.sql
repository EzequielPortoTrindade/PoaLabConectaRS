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
    "id_usuario" INTEGER,
    "id_fornecedor" INTEGER NOT NULL,
    "id_itemConsumo" INTEGER,
    "id_itemCapital" INTEGER,
    "id_escola" INTEGER NOT NULL,
    CONSTRAINT "Compra_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario" ("id_usuario") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Compra_id_fornecedor_fkey" FOREIGN KEY ("id_fornecedor") REFERENCES "Fornecedor" ("id_fornecedor") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Compra_id_itemConsumo_fkey" FOREIGN KEY ("id_itemConsumo") REFERENCES "Item_Consumo" ("id_itemConsumo") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Compra_id_itemCapital_fkey" FOREIGN KEY ("id_itemCapital") REFERENCES "Item_Capital" ("id_itemCapital") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Compra_id_escola_fkey" FOREIGN KEY ("id_escola") REFERENCES "Escola" ("id_escola") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Compra" ("data_compra", "id_compra", "id_escola", "id_fornecedor", "id_itemCapital", "id_itemConsumo", "id_usuario", "marca", "nota_fiscal", "quantidade", "valor_unitario") SELECT "data_compra", "id_compra", "id_escola", "id_fornecedor", "id_itemCapital", "id_itemConsumo", "id_usuario", "marca", "nota_fiscal", "quantidade", "valor_unitario" FROM "Compra";
DROP TABLE "Compra";
ALTER TABLE "new_Compra" RENAME TO "Compra";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
