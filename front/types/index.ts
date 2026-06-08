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
  id_localizacao: number | null
  localizacao?: Localizacao
}

export interface Fornecedor {
  id_fornecedor: number
  nome: string
  cnpj: string | null
  telefone: string | null
  email: string | null
  endereco: string | null
  criado_em: string
}

export interface Categoria {
  id_categoria: number
  nome: string
  tipo: TipoItem
}

export interface ItemConsumo {
  id_item: number
  nome: string
  descricao: string | null
  unidade_medida: string
  quantidade_minima: number
  id_categoria: number
  criado_em: string
  categoria?: Categoria
}

export interface ItemCapital {
  id_item: number
  nome: string
  descricao: string | null
  codigo_patrimonio: string | null
  valor_aquisicao: number | null
  data_aquisicao: string | null
  id_categoria: number
  id_fornecedor: number | null
  criado_em: string
  categoria?: Categoria
  fornecedor?: Fornecedor
}

export interface EstoqueEscola {
  id_estoque: number
  quantidade: number
  id_item: number
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
  id_item: number
  id_escola: number
  id_usuario: number
  criado_em: string
  item?: ItemConsumo
  escola?: Escola
  usuario?: Usuario
}

export interface Compra {
  id_compra: number
  numero_nota: string | null
  data_compra: string
  valor_total: number
  id_fornecedor: number
  id_usuario: number
  criado_em: string
  fornecedor?: Fornecedor
  usuario?: Usuario
  itens?: ItemCompra[]
}

export interface ItemCompra {
  id_item_compra: number
  quantidade: number
  valor_unitario: number
  id_compra: number
  id_item: number
  item?: ItemConsumo
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
