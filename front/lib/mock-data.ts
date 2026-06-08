import type {
  DashboardStats,
  MovimentacaoPeriodo,
  EstoqueBaixoItem,
  ResumoEscola,
  CategoriaDestaque,
  MovimentacaoEstoque,
  Escola,
  Usuario,
  Professor,
  ItemConsumo,
} from "@/types"

// ==========================================
// DADOS MOCK PARA O DASHBOARD
// ==========================================

export const dashboardStats: DashboardStats = {
  valor_total_estoque: 245678.9,
  total_itens: 1248,
  itens_estoque_baixo: 23,
  total_movimentacoes: 156,
  variacao_valor: 12.5,
  variacao_itens: 8.2,
  novos_itens_baixo: 5,
  variacao_movimentacoes: 15.3,
}

export const movimentacoesPeriodo: MovimentacaoPeriodo[] = [
  { data: "01/05", entradas: 45, saidas: 32 },
  { data: "07/05", entradas: 52, saidas: 48 },
  { data: "14/05", entradas: 61, saidas: 55 },
  { data: "21/05", entradas: 42, saidas: 38 },
  { data: "28/05", entradas: 78, saidas: 62 },
  { data: "31/05", entradas: 55, saidas: 45 },
]

export const estoqueBaixo: EstoqueBaixoItem[] = [
  { id_item: 1, nome: "Papel A4", categoria: "Papelaria", quantidade: 5 },
  { id_item: 2, nome: "Lápis Preto", categoria: "Papelaria", quantidade: 8 },
  { id_item: 3, nome: "Álcool 70% 1L", categoria: "Limpeza", quantidade: 3 },
  { id_item: 4, nome: "Toner HP 85A", categoria: "Informática", quantidade: 2 },
]

export const resumoEscolas: ResumoEscola[] = [
  { id_escola: 1, nome: "Monte Azul", valor: 98450.0, cor: "#4F46E5" },
  { id_escola: 2, nome: "São João", valor: 67230.0, cor: "#10B981" },
  { id_escola: 3, nome: "Dom Pedro", valor: 45120.0, cor: "#F59E0B" },
  { id_escola: 4, nome: "Outras", valor: 34878.9, cor: "#94A3B8" },
]

export const categoriasDestaque: CategoriaDestaque[] = [
  { id_categoria: 1, nome: "Papelaria", valor: 98450.0, porcentagem: 40 },
  { id_categoria: 2, nome: "Limpeza", valor: 67230.0, porcentagem: 27 },
  { id_categoria: 3, nome: "Informática", valor: 45120.0, porcentagem: 18 },
  { id_categoria: 4, nome: "Mobiliário", valor: 34878.9, porcentagem: 15 },
]

// ==========================================
// DADOS MOCK PARA ENTIDADES
// ==========================================

export const escolas: Escola[] = [
  {
    id_escola: 1,
    nome: "Escola Municipal Monte Azul",
    rua: "Rua das Flores",
    numero: 123,
    bairro: "Centro",
    id_localizacao: 1,
  },
  {
    id_escola: 2,
    nome: "Escola Municipal São João",
    rua: "Av. Principal",
    numero: 456,
    bairro: "Jardim América",
    id_localizacao: 1,
  },
  {
    id_escola: 3,
    nome: "Escola Municipal Dom Pedro",
    rua: "Rua das Palmeiras",
    numero: 789,
    bairro: "Vila Nova",
    id_localizacao: 1,
  },
]

export const usuarios: Usuario[] = [
  {
    id_usuario: 1,
    email: "admin@edustock.com",
    tipo: "admin",
    ativo: true,
    ultimo_login: "2024-05-30T10:45:00",
    criado_em: "2024-01-01T00:00:00",
  },
  {
    id_usuario: 2,
    email: "maria.silva@edustock.com",
    tipo: "professor",
    ativo: true,
    ultimo_login: "2024-05-30T09:30:00",
    criado_em: "2024-02-15T00:00:00",
  },
  {
    id_usuario: 3,
    email: "joao.santos@edustock.com",
    tipo: "professor",
    ativo: true,
    ultimo_login: "2024-05-29T14:20:00",
    criado_em: "2024-03-01T00:00:00",
  },
]

export const professores: Professor[] = [
  {
    id_professor: 1,
    nome: "Maria Silva",
    telefone: "(11) 99999-1234",
    id_escola: 1,
    id_usuario: 2,
  },
  {
    id_professor: 2,
    nome: "João Santos",
    telefone: "(11) 99999-5678",
    id_escola: 2,
    id_usuario: 3,
  },
  {
    id_professor: 3,
    nome: "Ana Costa",
    telefone: "(11) 99999-9012",
    id_escola: 3,
    id_usuario: 4,
  },
  {
    id_professor: 4,
    nome: "Carlos Lima",
    telefone: "(11) 99999-3456",
    id_escola: 1,
    id_usuario: 5,
  },
]

export const itensConsumo: ItemConsumo[] = [
  {
    id_item: 1,
    nome: "Papel A4",
    descricao: "Resma de papel A4 500 folhas",
    unidade_medida: "resma",
    quantidade_minima: 10,
    id_categoria: 1,
    criado_em: "2024-01-15T00:00:00",
  },
  {
    id_item: 2,
    nome: "Lápis Preto",
    descricao: "Lápis preto nº 2",
    unidade_medida: "unidade",
    quantidade_minima: 50,
    id_categoria: 1,
    criado_em: "2024-01-15T00:00:00",
  },
  {
    id_item: 3,
    nome: "Álcool 70%",
    descricao: "Álcool 70% 1 litro",
    unidade_medida: "litro",
    quantidade_minima: 20,
    id_categoria: 2,
    criado_em: "2024-01-15T00:00:00",
  },
  {
    id_item: 4,
    nome: "Toner HP 85A",
    descricao: "Toner para impressora HP",
    unidade_medida: "unidade",
    quantidade_minima: 5,
    id_categoria: 3,
    criado_em: "2024-01-15T00:00:00",
  },
  {
    id_item: 5,
    nome: "Caderno 10 Matérias",
    descricao: "Caderno universitário 10 matérias",
    unidade_medida: "unidade",
    quantidade_minima: 30,
    id_categoria: 1,
    criado_em: "2024-01-15T00:00:00",
  },
]

export const ultimasMovimentacoes: MovimentacaoEstoque[] = [
  {
    id_movimentacao: 1,
    tipo: "saida",
    quantidade: 20,
    observacao: null,
    id_item: 1,
    id_escola: 1,
    id_usuario: 2,
    criado_em: "2024-05-30T10:45:00",
    item: itensConsumo[0],
    escola: escolas[0],
    usuario: usuarios[1],
  },
  {
    id_movimentacao: 2,
    tipo: "entrada",
    quantidade: 50,
    observacao: null,
    id_item: 2,
    id_escola: 2,
    id_usuario: 3,
    criado_em: "2024-05-30T09:30:00",
    item: itensConsumo[1],
    escola: escolas[1],
    usuario: usuarios[2],
  },
  {
    id_movimentacao: 3,
    tipo: "saida",
    quantidade: 5,
    observacao: null,
    id_item: 3,
    id_escola: 3,
    id_usuario: 3,
    criado_em: "2024-05-29T16:20:00",
    item: itensConsumo[2],
    escola: escolas[2],
    usuario: usuarios[2],
  },
  {
    id_movimentacao: 4,
    tipo: "entrada",
    quantidade: 2,
    observacao: null,
    id_item: 4,
    id_escola: 1,
    id_usuario: 2,
    criado_em: "2024-05-29T14:10:00",
    item: itensConsumo[3],
    escola: escolas[0],
    usuario: usuarios[1],
  },
  {
    id_movimentacao: 5,
    tipo: "saida",
    quantidade: 15,
    observacao: null,
    id_item: 5,
    id_escola: 2,
    id_usuario: 2,
    criado_em: "2024-05-29T11:05:00",
    item: itensConsumo[4],
    escola: escolas[1],
    usuario: usuarios[1],
  },
]
