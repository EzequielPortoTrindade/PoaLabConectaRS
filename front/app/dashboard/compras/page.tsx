"use client"

import * as React from "react"
import {
  ShoppingCart,
  Plus,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "../../../lib/api"
import type { Escola } from "../../../../shared/school.interface"
import type { Fornecedor } from "../../../../shared/supplier.interface"
import type { Item_Consumo } from "../../../../shared/consumo.interface"
import type { Item_Capital } from "../../../../shared/capital.interface"
import type { Compra, CompraCreate } from "../../../../shared/purchase.interface"

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

const { data: itensCapital = [] } = useQuery<Item_Capital[]>({
  queryKey: ["itens-capital"],
  queryFn: () => api("/itens-capital"),
})

const { data: compras = [] } = useQuery<Compra[]>({
  queryKey: ["compras"],
  queryFn: () => api("/compras"),
})


const comprasComRelacionamentos = compras.map((compra: Compra) => ({
  ...compra,
  escola: escolas.find(
    (escola) => escola.id_escola === compra.id_escola
  ),
  fornecedor: fornecedores.find(
    (forn) => forn.id_fornecedor === compra.id_fornecedor
  ),
  item_consumo: itensConsumo.find(
    (item) => item.id_itemConsumo === compra.id_itemConsumo
  ),
  item_capital: itensCapital.find(
    (item) => item.id_itemCapital === compra.id_itemCapital
  ),
}))

export default function ComprasPage() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false)
  const [quantidade, setQuantidade] = React.useState("")
  const [dataCompra, setDataCompra] = React.useState("")
  const [valorUnitario, setValorUnitario] = React.useState("")
  const [marca, setMarca] = React.useState("")
  const [notaFiscal, setNotaFiscal] = React.useState("")
  const [escolaSelecionada, setEscolaSelecionada] = React.useState("")
  const [fornecedorSelecionado, setFornecedorSelecionado] = React.useState("")
  const [itemConsumoSelecionado, setItemConsumoSelecionado] = React.useState("")
  const [itemCapitalSelecionado, setItemCapitalSelecionado] = React.useState("")

  const filteredCompras = comprasComRelacionamentos.filter((compra) => {
  const query = searchTerm.toLowerCase()

  return (
    compra.fornecedor?.nome?.toLowerCase().includes(query) ||
    compra.escola?.nome?.toLowerCase().includes(query) ||
    compra.nota_fiscal.toLowerCase().includes(query) ||
    compra.marca.toLowerCase().includes(query) ||
    compra.item_consumo?.nome?.toLowerCase().includes(query) ||
    compra.item_capital?.nome?.toLowerCase().includes(query)
  )
})

  const totalFornecedoresUtilizados = new Set(
  compras.map((compra: Compra) => compra.id_fornecedor)
  ).size

  const totalEscolasAtendidas = new Set(
  compras.map((compra: Compra) => compra.id_escola)
  ).size

  const valorTotalComprado = compras.reduce(
  (acc: number, compra: Compra) =>
    acc + compra.quantidade * compra.valor_unitario,
  0
)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Compras
          </h1>
          <p className="text-muted-foreground">
            Gerencie compras com dados relacionados de escolas, fornecedores e itens.
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nova Compra
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Cadastrar Compra</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="quantidade">Quantidade</Label>
                  <Input
                    id="quantidade"
                    type="number"
                    value={quantidade}
                    onChange={(event) => setQuantidade(event.target.value)}
                    placeholder="0"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="data_compra">Data da Compra</Label>
                  <Input
                    id="data_compra"
                    type="date"
                    value={dataCompra}
                    onChange={(event) => setDataCompra(event.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="valor_unitario">Valor Unitário</Label>
                <Input
                  id="valor_unitario"
                  type="number"
                  step="0.01"
                  value={valorUnitario}
                  onChange={(event) => setValorUnitario(event.target.value)}
                  placeholder="0,00"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="marca">Marca</Label>
                <Input
                  id="marca"
                  value={marca}
                  onChange={(event) => setMarca(event.target.value)}
                  placeholder="Marca"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="nota_fiscal">Nota Fiscal</Label>
                <Input
                  id="nota_fiscal"
                  value={notaFiscal}
                  onChange={(event) => setNotaFiscal(event.target.value)}
                  placeholder="NF-2024-000"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="escola">Escola</Label>
                <Select
                  value={escolaSelecionada}
                  onValueChange={setEscolaSelecionada}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a escola" />
                  </SelectTrigger>
                  <SelectContent>
                    {escolas.map((escola) => (
                      <SelectItem
                        key={escola.id_escola}
                        value={escola.id_escola.toString()}
                      >
                        {escola.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="fornecedor">Fornecedor</Label>
                <Select
                  value={fornecedorSelecionado}
                  onValueChange={setFornecedorSelecionado}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o fornecedor" />
                  </SelectTrigger>
                  <SelectContent>
                    {fornecedores.map((fornecedor) => (
                      <SelectItem
                        key={fornecedor.id_fornecedor}
                        value={fornecedor.id_fornecedor.toString()}
                      >
                        {fornecedor.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="item_consumo">Item de Consumo</Label>
                <Select
                  value={itemConsumoSelecionado}
                  onValueChange={(value) => {
                    setItemConsumoSelecionado(value)
                    if (value) setItemCapitalSelecionado("")
                  }}
                  disabled={!!itemCapitalSelecionado}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um item de consumo" />
                  </SelectTrigger>
                  <SelectContent>
                    {itensConsumo.map((item) => (
                      <SelectItem
                        key={item.id_itemConsumo}
                        value={item.id_itemConsumo.toString()}
                      >
                        {item.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="item_capital">Item de Capital</Label>
                <Select
                  value={itemCapitalSelecionado}
                  onValueChange={(value) => {
                    setItemCapitalSelecionado(value)
                    if (value) setItemConsumoSelecionado("")
                  }}
                  disabled={!!itemConsumoSelecionado}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um item de capital" />
                  </SelectTrigger>
                  <SelectContent>
                    {itensCapital.map((item) => (
                      <SelectItem
                        key={item.id_itemCapital}
                        value={item.id_itemCapital.toString()}
                      >
                        {item.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <p className="text-sm text-muted-foreground">
                Selecione apenas um tipo de item: Consumo ou Capital.
              </p>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button onClick={() => setIsCreateDialogOpen(false)}>
                Cadastrar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Compras
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{compras.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Fornecedores Utilizados
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalFornecedoresUtilizados}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Escolas Atendidas
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEscolasAtendidas}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Valor Total Comprado
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {valorTotalComprado.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Compras</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar fornecedor, escola, nota fiscal, item ou marca..."
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
                <TableHead>Data da Compra</TableHead>
                <TableHead>Escola</TableHead>
                <TableHead>Fornecedor</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Tipo do Item</TableHead>
                <TableHead className="text-right">Quantidade</TableHead>
                <TableHead className="text-right">Valor Unitário</TableHead>
                <TableHead>Marca</TableHead>
                <TableHead>Nota Fiscal</TableHead>
                <TableHead className="text-right">Valor Total</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCompras.map((compra) => {
                const itemName =
                  compra.item_consumo?.nome ?? compra.item_capital?.nome ?? "-"
                const itemType = compra.item_consumo
                  ? "Consumo"
                  : compra.item_capital
                  ? "Capital"
                  : "-"
                const valorTotal = compra.quantidade * compra.valor_unitario

                return (
                  <TableRow key={compra.id_compra}>
                    <TableCell>{new Date(compra.data_compra).toLocaleDateString("pt-BR")}</TableCell>
                    <TableCell>{compra.escola?.nome ?? "-"}</TableCell>
                    <TableCell>{compra.fornecedor?.nome ?? "-"}</TableCell>
                    <TableCell>{itemName}</TableCell>
                    <TableCell>{itemType}</TableCell>
                    <TableCell className="text-right">{compra.quantidade}</TableCell>
                    <TableCell className="text-right">
                      R$ {compra.valor_unitario.toFixed(2)}
                    </TableCell>
                    <TableCell>{compra.marca}</TableCell>
                    <TableCell>{compra.nota_fiscal}</TableCell>
                    <TableCell className="text-right">
                      R$ {valorTotal.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Visualizar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
                          </DropdownMenuItem>
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
