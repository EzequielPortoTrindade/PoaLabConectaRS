// ==========================================
// TIPOS BASE - BASEADOS NAS TABELAS SQL
// ==========================================

export type TipoUsuario = "admin" | "professor"
export type TipoMovimentacao = "entrada" | "saida"
export type TipoItem = "consumo" | "capital"

// ==========================================
// ENTIDADES PRINCIPAIS
// ==========================================

export interface Usuario {
  id_usuario: number
  email: string
  tipo: TipoUsuario
  ativo: boolean
  ultimo_login: string | null
  criado_em: string
}

export interface Professor {
  id_professor: number
  nome: string
  telefone: string | null
  id_escola: number
  id_usuario: number
  escola?: Escola
  usuario?: Usuario
}

export interface Localizacao {
  id_localizacao: number
  nome_cidade: string
  uf: string | null
}

export interface Escola {
  id_escola: number
  nome: string
  rua: string | null
  numero: number | null
  bairro: string | null
  id_localizacao: number 
  localizacao?: Localizacao
}

export interface Fornecedor {
  id_fornecedor: number
  nome: string
  cnpj: string 
  telefone: string | null
  email: string 
  website: string | null
  id_localizacao: number
  localizacao?: Localizacao
}

export interface Categoria {
  id_categoria: number
  nome: string
  tipo: TipoItem
}

export interface ItemConsumo {
  id_item_consumo: number
  nome: string
  descricao: string | null
  quantidade: number
  id_escola: number
  id_fornecedor: number
  criado_em: string
  escola?: Escola
  fornecedor?: Fornecedor
}

export interface ItemCapital {
  id_item_capital: number
  nome: string
  numero_patrimonio: string | null
  descricao: string | null
  id_escola: number
  id_fornecedor: number
  escola?: Escola
  fornecedor?: Fornecedor
}

export interface EstoqueEscola {
  id_estoque: number
  quantidade: number
  id_item_consumo: number
  id_escola: number
  atualizado_em: string
  item?: ItemConsumo
  escola?: Escola
}

export interface MovimentacaoEstoque {
  id_movimentacao: number
  tipo: TipoMovimentacao
  quantidade: number
  observacao: string | null
  id_item_consumo: number
  id_escola: number
  id_usuario: number
  criado_em: string
  item?: ItemConsumo
  escola?: Escola
  usuario?: Usuario
}

export interface Compra {
  id_compra: number
  nota_fiscal: string 
  data_compra: string
  quantidade: number
  valor_unitario: number
  marca: string | null
  id_item_consumo: number | null
  id_item_capital: number | null
  id_escola: number
  id_fornecedor: number
  fornecedor?: Fornecedor
  escola?: Escola
  ItemCapital?: ItemCapital
  ItemConsumo?: ItemConsumo
}


// ==========================================
// TIPOS DE RESPOSTA DA API
// ==========================================

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  per_page: number
  total_pages: number
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

// ==========================================
// TIPOS DO DASHBOARD
// ==========================================

export interface DashboardStats {
  valor_total_estoque: number
  total_itens: number
  itens_estoque_baixo: number
  total_movimentacoes: number
  variacao_valor: number
  variacao_itens: number
  novos_itens_baixo: number
  variacao_movimentacoes: number
}

export interface MovimentacaoPeriodo {
  data: string
  entradas: number
  saidas: number
}

export interface EstoqueBaixoItem {
  id_item: number
  nome: string
  categoria: string
  quantidade: number
}

export interface ResumoEscola {
  id_escola: number
  nome: string
  valor: number
  cor: string
}

export interface CategoriaDestaque {
  id_categoria: number
  nome: string
  valor: number
  porcentagem: number
}

// ==========================================
// TIPOS DE FILTRO
// ==========================================

export interface DateRange {
  from: Date
  to: Date
}

export interface TableFilters {
  search?: string
  page?: number
  per_page?: number
  sort_by?: string
  sort_order?: "asc" | "desc"
}
