import mongoose from "mongoose";

// =========================
// MODELS MONGO
// =========================

// Escola
const EscolaSchema = new mongoose.Schema({
  nome: String,
  rua: String,
  numero: Number,
  bairro: String,
  uf: String,
  localizacao: { cidade: String },
});

export const EscolaMongo = mongoose.model("Escola", EscolaSchema);

// Usuario
const UsuarioSchema = new mongoose.Schema({
  nome: String,
  email: String,
  tipo: { type: String, enum: ["admin", "professor"] },
  escolaId: mongoose.Schema.Types.ObjectId,
});

export const UsuarioMongo = mongoose.model("Usuario", UsuarioSchema);

// Fornecedor
const FornecedorSchema = new mongoose.Schema({
  cnpj: String,
  nome: String,
  telefone: String,
  email: String,
});

export const FornecedorMongo = mongoose.model("Fornecedor", FornecedorSchema);

// Item
const ItemSchema = new mongoose.Schema({
  nome: String,
  quantidade: Number,
  categoria: { type: String, enum: ["capital", "consumo"] },
  descricao: String,
  escolaId: mongoose.Schema.Types.ObjectId,
  fornecedorId: mongoose.Schema.Types.ObjectId,
});

export const ItemMongo = mongoose.model("Item", ItemSchema);

// Compra
const CompraSchema = new mongoose.Schema({
  quantidade: Number,
  data_compra: Date,
  valor_unitario: Number,
  marca: String,
  nota_fiscal: String,
  itemId: mongoose.Schema.Types.ObjectId,
  usuarioId: mongoose.Schema.Types.ObjectId,
  escolaId: mongoose.Schema.Types.ObjectId,
  fornecedorId: mongoose.Schema.Types.ObjectId,
});

export const CompraMongo = mongoose.model("Compra", CompraSchema);

// Log
const LogSchema = new mongoose.Schema({
  quantidade: Number,
  data_hora: { type: Date, default: Date.now },
  itemId: mongoose.Schema.Types.ObjectId,
  usuarioId: mongoose.Schema.Types.ObjectId,
  escolaId: mongoose.Schema.Types.ObjectId,
});

export const LogMongo = mongoose.model("LogSaida", LogSchema);

//import { connectMongo, EscolaMongo } from "./db/mongo";
//await connectMongo();