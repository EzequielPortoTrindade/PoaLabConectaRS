// src/database/mongoose/models.ts
import mongoose, { Schema, Document } from 'mongoose'

// ─── Localizacao ─────────────────────────────────────────────────────────────
export interface ILocalizacao extends Document {
  nome_cidade: string
}
const LocalizacaoSchema = new Schema<ILocalizacao>({
  nome_cidade: { type: String, required: true, maxlength: 100 },
})
export const LocalizacaoModel = mongoose.model<ILocalizacao>('Localizacao', LocalizacaoSchema)

// ─── Escola ───────────────────────────────────────────────────────────────────
export interface IEscola extends Document {
  nome: string
  rua?: string
  numero?: number
  bairro?: string
  uf?: string
  id_localizacao?: mongoose.Types.ObjectId
}
const EscolaSchema = new Schema<IEscola>({
  nome:           { type: String, required: true, maxlength: 150 },
  rua:            { type: String, maxlength: 100 },
  numero:         { type: Number },
  bairro:         { type: String, maxlength: 100 },
  uf:             { type: String, maxlength: 2 },
  id_localizacao: { type: Schema.Types.ObjectId, ref: 'Localizacao' },
})
export const EscolaModel = mongoose.model<IEscola>('Escola', EscolaSchema)

// ─── Usuario ──────────────────────────────────────────────────────────────────
export interface IUsuario extends Document {
  nome: string
  email: string
  tipo: 'admin' | 'professor'
  id_escola?: mongoose.Types.ObjectId
}
const UsuarioSchema = new Schema<IUsuario>({
  nome:      { type: String, required: true, maxlength: 100 },
  email:     { type: String, required: true, unique: true, maxlength: 100 },
  tipo:      { type: String, enum: ['admin', 'professor'], required: true },
  id_escola: { type: Schema.Types.ObjectId, ref: 'Escola' },
})
export const UsuarioModel = mongoose.model<IUsuario>('Usuario', UsuarioSchema)

// ─── Fornecedor ───────────────────────────────────────────────────────────────
export interface IFornecedor extends Document {
  nome: string
  endereco?: string
  website?: string
}
const FornecedorSchema = new Schema<IFornecedor>({
  nome:     { type: String, required: true, maxlength: 100 },
  endereco: { type: String, maxlength: 150 },
  website:  { type: String, maxlength: 100 },
})
export const FornecedorModel = mongoose.model<IFornecedor>('Fornecedor', FornecedorSchema)

// ─── Contato ──────────────────────────────────────────────────────────────────
export interface IContato extends Document {
  fornecedor_id: mongoose.Types.ObjectId
  tipo: 'telefone' | 'whatsapp'
  numero: string
}
const ContatoSchema = new Schema<IContato>({
  fornecedor_id: { type: Schema.Types.ObjectId, ref: 'Fornecedor', required: true },
  tipo:          { type: String, enum: ['telefone', 'whatsapp'], required: true },
  numero:        { type: String, required: true, maxlength: 20 },
})
export const ContatoModel = mongoose.model<IContato>('Contato', ContatoSchema)

// ─── Tipo ─────────────────────────────────────────────────────────────────────
export interface ITipo extends Document {
  nome: string
  categoria: 'capital' | 'custeio'
  descricao?: string
}
const TipoSchema = new Schema<ITipo>({
  nome:      { type: String, required: true, maxlength: 100 },
  categoria: { type: String, enum: ['capital', 'custeio'], required: true },
  descricao: { type: String, maxlength: 150 },
})
export const TipoModel = mongoose.model<ITipo>('Tipo', TipoSchema)

// ─── Item ─────────────────────────────────────────────────────────────────────
export interface IItem extends Document {
  quantidade: number
  descricao?: string
  id_tipo?: mongoose.Types.ObjectId
  id_escola?: mongoose.Types.ObjectId
}
const ItemSchema = new Schema<IItem>({
  quantidade: { type: Number, required: true },
  descricao:  { type: String, maxlength: 150 },
  id_tipo:    { type: Schema.Types.ObjectId, ref: 'Tipo' },
  id_escola:  { type: Schema.Types.ObjectId, ref: 'Escola' },
})
export const ItemModel = mongoose.model<IItem>('Item', ItemSchema)

// ─── Compras ──────────────────────────────────────────────────────────────────
export interface ICompras extends Document {
  id_item?: mongoose.Types.ObjectId
  id_fornecedor?: mongoose.Types.ObjectId
  id_escola?: mongoose.Types.ObjectId
  quantidade: number
  data_compra?: Date
  valor_unitario?: number
  marca?: string
  nota_fiscal?: string
}
const ComprasSchema = new Schema<ICompras>({
  id_item:        { type: Schema.Types.ObjectId, ref: 'Item' },
  id_fornecedor:  { type: Schema.Types.ObjectId, ref: 'Fornecedor' },
  id_escola:      { type: Schema.Types.ObjectId, ref: 'Escola' },
  quantidade:     { type: Number, required: true },
  data_compra:    { type: Date },
  valor_unitario: { type: Number },
  marca:          { type: String, maxlength: 40 },
  nota_fiscal:    { type: String, maxlength: 50 },
})
export const ComprasModel = mongoose.model<ICompras>('Compras', ComprasSchema)

// ─── LogMovimentacao ──────────────────────────────────────────────────────────
export interface ILogMovimentacao extends Document {
  id_item?: mongoose.Types.ObjectId
  id_usuario?: mongoose.Types.ObjectId
  tipo_movimentacao: 'entrada' | 'saida'
  quantidade?: number
  data_hora: Date
  motivo?: string
}
const LogMovimentacaoSchema = new Schema<ILogMovimentacao>({
  id_item:           { type: Schema.Types.ObjectId, ref: 'Item' },
  id_usuario:        { type: Schema.Types.ObjectId, ref: 'Usuario' },
  tipo_movimentacao: { type: String, enum: ['entrada', 'saida'], required: true },
  quantidade:        { type: Number },
  data_hora:         { type: Date, default: Date.now },
  motivo:            { type: String, maxlength: 150 },
})
export const LogMovimentacaoModel = mongoose.model<ILogMovimentacao>('LogMovimentacao', LogMovimentacaoSchema)
