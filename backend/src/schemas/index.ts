// src/schemas/index.ts
import { z } from 'zod'

export const LocalizacaoSchema = z.object({
  nome_cidade: z.string().min(1).max(100),
})

export const EscolaSchema = z.object({
  nome:           z.string().min(1).max(150),
  rua:            z.string().max(100).optional(),
  numero:         z.number().int().optional(),
  bairro:         z.string().max(100).optional(),
  uf:             z.string().length(2).optional(),
  id_localizacao: z.number().int().optional(),
})

export const UsuarioSchema = z.object({
  nome:      z.string().min(1).max(100),
  email:     z.string().email().max(100),
  tipo:      z.enum(['admin', 'professor']),
  id_escola: z.number().int().optional(),
})

export const FornecedorSchema = z.object({
  nome:     z.string().min(1).max(100),
  endereco: z.string().max(150).optional(),
  website:  z.string().url().max(100).optional(),
})

export const ContatoSchema = z.object({
  fornecedor_id: z.number().int(),
  tipo:          z.enum(['telefone', 'whatsapp']),
  numero:        z.string().min(1).max(20),
})

export const TipoSchema = z.object({
  nome:      z.string().min(1).max(100),
  categoria: z.enum(['capital', 'custeio']),
  descricao: z.string().max(150).optional(),
})

export const ItemSchema = z.object({
  quantidade: z.number().int().min(0),
  descricao:  z.string().max(150).optional(),
  id_tipo:    z.number().int().optional(),
  id_escola:  z.number().int().optional(),
})

export const ComprasSchema = z.object({
  id_item:        z.number().int().optional(),
  id_fornecedor:  z.number().int().optional(),
  id_escola:      z.number().int().optional(),
  quantidade:     z.number().int().min(1),
  data_compra:    z.string().optional(), // ISO date string
  valor_unitario: z.number().positive().optional(),
  marca:          z.string().max(40).optional(),
  nota_fiscal:    z.string().max(50).optional(),
})

export const LogMovimentacaoSchema = z.object({
  id_item:           z.number().int().optional(),
  id_usuario:        z.number().int().optional(),
  tipo_movimentacao: z.enum(['entrada', 'saida']),
  quantidade:        z.number().int().optional(),
  motivo:            z.string().max(150).optional(),
})

// Tipos inferidos do Zod
export type LocalizacaoInput    = z.infer<typeof LocalizacaoSchema>
export type EscolaInput         = z.infer<typeof EscolaSchema>
export type UsuarioInput        = z.infer<typeof UsuarioSchema>
export type FornecedorInput     = z.infer<typeof FornecedorSchema>
export type ContatoInput        = z.infer<typeof ContatoSchema>
export type TipoInput           = z.infer<typeof TipoSchema>
export type ItemInput           = z.infer<typeof ItemSchema>
export type ComprasInput        = z.infer<typeof ComprasSchema>
export type LogMovimentacaoInput = z.infer<typeof LogMovimentacaoSchema>
