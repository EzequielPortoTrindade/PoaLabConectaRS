"use client"

import * as React from "react"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search as SearchIcon } from "lucide-react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "../../../lib/api"
import type { Escola } from "../../../../shared/school.interface"
import type { Fornecedor } from "../../../../shared/supplier.interface"
import type { Item_Consumo } from "../../../../shared/consumo.interface"

const { data: escolas = [] } = useQuery<Escola[]>({
  queryKey: ["escolas"],
  queryFn: () => api("/escolas"),
})

const { data: fornecedores = [] } = useQuery<Fornecedor[]>({
  queryKey: ["fornecedores"],
  queryFn: () => api("/fornecedores"),
})

const { data: itensConsumo = [] } = useQuery<Item_Consumo[]>({
  queryKey: ["itens-consumo"],
  queryFn: () => api("/itens-consumo"),
})

const estoque = itensConsumo.map((item: Item_Consumo) => ({
  ...item,
  escola: escolas.find(
    (escola: Escola) => escola.id_escola === item.id_escola
  ),
  fornecedor: fornecedores.find(
    (fornecedor: Fornecedor) =>
      fornecedor.id_fornecedor === item.id_fornecedor
  ),
}))

const getStatus = (quantidade: number) => {
  if (quantidade <= 10) return "Crítico"
  if (quantidade <= 30) return "Baixo"
  return "Normal"
}

const getBadgeVariant = (status: string) => {
  switch (status) {
    case "Crítico":
      return "destructive"
    case "Baixo":
      return "secondary"
    default:
      return "default"
  }
}

export default function EstoquePage() {
  const [searchTerm, setSearchTerm] = React.useState("")

  const filteredEstoque = estoque.filter((item) => {
    const query = searchTerm.toLowerCase()
    return (
      item.nome.toLowerCase().includes(query) ||
      item.escola?.nome.toLowerCase().includes(query) ||
      item.fornecedor?.nome.toLowerCase().includes(query)
    )
  })

  const totalItens = estoque.length
  const totalQuantidade = estoque.reduce((acc, item) => acc + item.quantidade, 0)
  const itensEstoqueBaixo = estoque.filter((item) => item.quantidade <= 30).length
  const escolasComEstoque = new Set(estoque.map((item) => item.id_escola)).size

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Controle de Estoque
          </h1>
          <p className="text-muted-foreground">
            Monitore os itens de consumo em estoque com base nas relações com escola e fornecedor.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Quantidade Total em Estoque
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalQuantidade.toLocaleString("pt-BR")}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Itens com Estoque Baixo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{itensEstoqueBaixo}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Escolas com Estoque
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{escolasComEstoque}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Estoque de Itens de Consumo</CardTitle>
            <div className="relative w-full sm:w-64">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar item, escola ou fornecedor..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome do Item</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Escola</TableHead>
                <TableHead>Fornecedor</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEstoque.map((item) => {
                const status = getStatus(item.quantidade)
                return (
                  <TableRow key={item.id_itemConsumo}>
                    <TableCell className="font-medium">{item.nome}</TableCell>
                    <TableCell>{item.quantidade}</TableCell>
                    <TableCell>{item.escola?.nome ?? "-"}</TableCell>
                    <TableCell>{item.fornecedor?.nome ?? "-"}</TableCell>
                    <TableCell>{item.descricao ?? "-"}</TableCell>
                    <TableCell>
                      <Badge variant={getBadgeVariant(status)}>
                        {status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <span className="sr-only">Abrir menu</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-4 w-4"
                            >
                              <path d="M12 7.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm0 6a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm0 6a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                            </svg>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Visualizar</DropdownMenuItem>
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Excluir</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
