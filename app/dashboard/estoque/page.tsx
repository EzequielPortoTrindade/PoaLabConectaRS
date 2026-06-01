"use client"

import * as React from "react"
import {
  ClipboardList,
  Search,
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Filter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

const estoque = [
  { id: 1, codigo: "EST-001", nome: "Papel A4", categoria: "Papelaria", escola: "Monte Azul", quantidade: 45, estoqueMinimo: 50, estoqueMaximo: 200, unidade: "resmas", ultimaMovimentacao: "28/05/2024" },
  { id: 2, codigo: "EST-002", nome: "Lápis Preto", categoria: "Papelaria", escola: "São João", quantidade: 120, estoqueMinimo: 100, estoqueMaximo: 500, unidade: "un", ultimaMovimentacao: "27/05/2024" },
  { id: 3, codigo: "EST-003", nome: "Álcool 70%", categoria: "Limpeza", escola: "Dom Pedro", quantidade: 8, estoqueMinimo: 20, estoqueMaximo: 100, unidade: "L", ultimaMovimentacao: "26/05/2024" },
  { id: 4, codigo: "EST-004", nome: "Detergente", categoria: "Limpeza", escola: "Monte Azul", quantidade: 35, estoqueMinimo: 30, estoqueMaximo: 100, unidade: "un", ultimaMovimentacao: "25/05/2024" },
  { id: 5, codigo: "EST-005", nome: "Toner HP 85A", categoria: "Informática", escola: "São João", quantidade: 3, estoqueMinimo: 5, estoqueMaximo: 20, unidade: "un", ultimaMovimentacao: "24/05/2024" },
  { id: 6, codigo: "EST-006", nome: "Caneta Esferográfica", categoria: "Papelaria", escola: "Dom Pedro", quantidade: 250, estoqueMinimo: 100, estoqueMaximo: 500, unidade: "un", ultimaMovimentacao: "23/05/2024" },
  { id: 7, codigo: "EST-007", nome: "Borracha Branca", categoria: "Papelaria", escola: "Monte Azul", quantidade: 80, estoqueMinimo: 50, estoqueMaximo: 200, unidade: "un", ultimaMovimentacao: "22/05/2024" },
  { id: 8, codigo: "EST-008", nome: "Desinfetante", categoria: "Limpeza", escola: "São João", quantidade: 12, estoqueMinimo: 15, estoqueMaximo: 50, unidade: "L", ultimaMovimentacao: "21/05/2024" },
]

export default function EstoquePage() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [filtroCategoria, setFiltroCategoria] = React.useState("todas")
  const [filtroEscola, setFiltroEscola] = React.useState("todas")

  const filteredEstoque = estoque.filter((item) => {
    const matchSearch =
      item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.codigo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchCategoria = filtroCategoria === "todas" || item.categoria === filtroCategoria
    const matchEscola = filtroEscola === "todas" || item.escola === filtroEscola
    return matchSearch && matchCategoria && matchEscola
  })

  const getStatusEstoque = (item: typeof estoque[0]) => {
    const percentual = (item.quantidade / item.estoqueMaximo) * 100
    if (item.quantidade <= item.estoqueMinimo) {
      return { status: "Crítico", color: "destructive", percentual }
    } else if (item.quantidade <= item.estoqueMinimo * 1.5) {
      return { status: "Baixo", color: "warning", percentual }
    }
    return { status: "Normal", color: "default", percentual }
  }

  const itensAbaixoMinimo = estoque.filter((i) => i.quantidade <= i.estoqueMinimo).length
  const totalItens = estoque.reduce((acc, i) => acc + i.quantidade, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Controle de Estoque
          </h1>
          <p className="text-muted-foreground">
            Monitore os níveis de estoque em tempo real
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tipos de Itens
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estoque.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total em Estoque
            </CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItens.toLocaleString("pt-BR")}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Estoque Baixo
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{itensAbaixoMinimo}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Categorias
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(estoque.map((i) => i.categoria)).size}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Níveis de Estoque</CardTitle>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative w-full sm:w-48">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar item..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
                <SelectTrigger className="w-full sm:w-40">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas</SelectItem>
                  <SelectItem value="Papelaria">Papelaria</SelectItem>
                  <SelectItem value="Limpeza">Limpeza</SelectItem>
                  <SelectItem value="Informática">Informática</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filtroEscola} onValueChange={setFiltroEscola}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Escola" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas</SelectItem>
                  <SelectItem value="Monte Azul">Monte Azul</SelectItem>
                  <SelectItem value="São João">São João</SelectItem>
                  <SelectItem value="Dom Pedro">Dom Pedro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Escola</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead className="w-[200px]">Nível</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEstoque.map((item) => {
                const statusInfo = getStatusEstoque(item)
                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono text-sm">{item.codigo}</TableCell>
                    <TableCell className="font-medium">{item.nome}</TableCell>
                    <TableCell>{item.categoria}</TableCell>
                    <TableCell>{item.escola}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {item.quantidade < item.estoqueMinimo ? (
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        ) : (
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        )}
                        {item.quantidade} {item.unidade}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={statusInfo.percentual}
                          className="h-2"
                        />
                        <span className="text-xs text-muted-foreground">
                          {Math.round(statusInfo.percentual)}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          statusInfo.status === "Crítico"
                            ? "destructive"
                            : statusInfo.status === "Baixo"
                            ? "secondary"
                            : "default"
                        }
                        className={
                          statusInfo.status === "Baixo"
                            ? "bg-yellow-500 text-white hover:bg-yellow-600"
                            : ""
                        }
                      >
                        {statusInfo.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
