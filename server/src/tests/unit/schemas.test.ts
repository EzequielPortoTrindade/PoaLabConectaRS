// src/tests/unit/schemas.test.ts
import { describe, it, expect } from 'vitest'
import {
  EscolaSchema,
  UsuarioSchema,
  FornecedorSchema,
  ItemSchema,
  ComprasSchema,
  LogMovimentacaoSchema,
  TipoSchema,
  ContatoSchema,
} from '../../schemas'

describe('Schema: Escola', () => {
  it('aceita dados válidos', () => {
    const result = EscolaSchema.safeParse({
      nome: 'Escola Estadual',
      uf: 'RS',
      numero: 100,
    })
    expect(result.success).toBe(true)
  })

  it('rejeita nome vazio', () => {
    const result = EscolaSchema.safeParse({ nome: '' })
    expect(result.success).toBe(false)
  })

  it('rejeita UF com mais de 2 caracteres', () => {
    const result = EscolaSchema.safeParse({ nome: 'Escola', uf: 'RGS' })
    expect(result.success).toBe(false)
  })
})

describe('Schema: Usuario', () => {
  it('aceita tipo admin', () => {
    const result = UsuarioSchema.safeParse({
      nome: 'João',
      email: 'joao@escola.com',
      tipo: 'admin',
    })
    expect(result.success).toBe(true)
  })

  it('aceita tipo professor', () => {
    const result = UsuarioSchema.safeParse({
      nome: 'Maria',
      email: 'maria@escola.com',
      tipo: 'professor',
    })
    expect(result.success).toBe(true)
  })

  it('rejeita email inválido', () => {
    const result = UsuarioSchema.safeParse({
      nome: 'João',
      email: 'nao-e-email',
      tipo: 'admin',
    })
    expect(result.success).toBe(false)
  })

  it('rejeita tipo desconhecido', () => {
    const result = UsuarioSchema.safeParse({
      nome: 'João',
      email: 'joao@escola.com',
      tipo: 'diretor',
    })
    expect(result.success).toBe(false)
  })
})

describe('Schema: Fornecedor', () => {
  it('aceita website válido', () => {
    const result = FornecedorSchema.safeParse({
      nome: 'Papelaria Central',
      website: 'https://papelaria.com',
    })
    expect(result.success).toBe(true)
  })

  it('rejeita website sem protocolo', () => {
    const result = FornecedorSchema.safeParse({
      nome: 'Papelaria',
      website: 'papelaria.com',
    })
    expect(result.success).toBe(false)
  })
})

describe('Schema: Item', () => {
  it('rejeita quantidade negativa', () => {
    const result = ItemSchema.safeParse({ quantidade: -1 })
    expect(result.success).toBe(false)
  })

  it('aceita quantidade zero', () => {
    const result = ItemSchema.safeParse({ quantidade: 0 })
    expect(result.success).toBe(true)
  })
})

describe('Schema: Compras', () => {
  it('rejeita quantidade menor que 1', () => {
    const result = ComprasSchema.safeParse({ quantidade: 0 })
    expect(result.success).toBe(false)
  })

  it('rejeita valor_unitario negativo', () => {
    const result = ComprasSchema.safeParse({ quantidade: 1, valor_unitario: -10 })
    expect(result.success).toBe(false)
  })
})

describe('Schema: LogMovimentacao', () => {
  it('aceita entrada e saida', () => {
    expect(LogMovimentacaoSchema.safeParse({ tipo_movimentacao: 'entrada' }).success).toBe(true)
    expect(LogMovimentacaoSchema.safeParse({ tipo_movimentacao: 'saida' }).success).toBe(true)
  })

  it('rejeita tipo inválido', () => {
    const result = LogMovimentacaoSchema.safeParse({ tipo_movimentacao: 'transferencia' })
    expect(result.success).toBe(false)
  })
})

describe('Schema: Tipo', () => {
  it('aceita categorias válidas', () => {
    expect(TipoSchema.safeParse({ nome: 'Cadeira', categoria: 'capital' }).success).toBe(true)
    expect(TipoSchema.safeParse({ nome: 'Papel', categoria: 'custeio' }).success).toBe(true)
  })
})

describe('Schema: Contato', () => {
  it('aceita telefone e whatsapp', () => {
    const base = { fornecedor_id: 1, numero: '51999999999' }
    expect(ContatoSchema.safeParse({ ...base, tipo: 'telefone' }).success).toBe(true)
    expect(ContatoSchema.safeParse({ ...base, tipo: 'whatsapp' }).success).toBe(true)
  })
})
