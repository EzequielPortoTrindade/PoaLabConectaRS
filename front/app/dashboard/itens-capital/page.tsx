"use client"

import * as React from "react"
import {
  Boxes,
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
  DialogDescription,
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
import { PageHeader } from "@/components/shared"
import { escolas, fornecedores } from "@/lib/mock-data"

interface CapitalItem {
  id_item_capital: number
  numero_patrimonio: string
  nome: string
  descricao: string | null
  id_escola: number
  id_fornecedor: number
}

const itensCapital: CapitalItem[] = [
  {
    id_item_capital: 1,
    numero_patrimonio: "PAT-001234",
    nome: "Computador Desktop Dell",
    descricao: "PC para sala de informática",
    id_escola: 1,
    id_fornecedor: 1,
  },
  {
    id_item_capital: 2,
    numero_patrimonio: "PAT-001235",
    nome: "Projetor Epson",
    descricao: "Projetor para sala de aula",
    id_escola: 2,
    id_fornecedor: 2,
  },
  {
    id_item_capital: 3,
    numero_patrimonio: "PAT-001236",
    nome: "Impressora HP LaserJet",
    descricao: "Impressora de escritório",
    id_escola: 3,
    id_fornecedor: 3,
  },
  {
    id_item_capital: 4,
    numero_patrimonio: "PAT-001237",
    nome: "Mesa de Professor",
    descricao: "Mesa de madeira para sala de aula",
    id_escola: 1,
    id_fornecedor: 1,
  },
  {
    id_item_capital: 5,
    numero_patrimonio: "PAT-001238",
    nome: "Ar Condicionado Split",
    descricao: "Ar condicionado para sala dos professores",
    id_escola: 2,
    id_fornecedor: 2,
  },
  {
    id_item_capital: 6,
    numero_patrimonio: "PAT-001239",
    nome: "Cadeira Giratória",
    descricao: "Cadeira ergonômica para escritório",
    id_escola: 3,
    id_fornecedor: 3,
  },
]

const itemsWithRelations = itensCapital.map((item) => ({
  ...item,
  escola: escolas.find((school) => school.id_escola === item.id_escola),
  fornecedor: fornecedores.find((forn) => forn.id_fornecedor === item.id_fornecedor),
}))

export default function ItensCapitalPage() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false)
  const [numeroPatrimonio, setNumeroPatrimonio] = React.useState("")
  const [nome, setNome] = React.useState("")
  const [descricao, setDescricao] = React.useState("")
  const [escolaSelecionada, setEscolaSelecionada] = React.useState("")
  const [fornecedorSelecionado, setFornecedorSelecionado] = React.useState("")

  const filteredItens = itemsWithRelations.filter((item) => {
    const query = searchTerm.toLowerCase()
    return (
      item.numero_patrimonio.toLowerCase().includes(query) ||
      item.nome.toLowerCase().includes(query) ||
      item.escola?.nome.toLowerCase().includes(query) ||
      item.fornecedor?.nome.toLowerCase().includes(query) ||
      item.descricao?.toLowerCase().includes(query)
    )
  })

  const totalEscolasComPatrimonio = new Set(
    itemsWithRelations.map((item) => item.id_escola)
  ).size

  const totalFornecedoresRelacionados = new Set(
    itemsWithRelations.map((item) => item.id_fornecedor)
  ).size

  return (
    <div className="space-y-6">
      <PageHeader
        title="Itens de Capital"
        description="Gerencie os bens patrimoniais com suas escolas e fornecedores"
      >
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Cadastrar Item de Capital</DialogTitle>
              <DialogDescription>
                Preencha os dados para cadastrar um novo item de capital.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="numero_patrimonio">Número do Patrimônio</Label>
                <Input
                  id="numero_patrimonio"
                  value={numeroPatrimonio}
                  onChange={(event) => setNumeroPatrimonio(event.target.value)}
                  placeholder="PAT-000000"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  value={nome}
                  onChange={(event) => setNome(event.target.value)}
                  placeholder="Nome do item"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Input
                  id="descricao"
                  value={descricao}
                  onChange={(event) => setDescricao(event.target.value)}
                  placeholder="Descrição do item"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="escola">Escola</Label>
                <Select
                  value={escolaSelecionada}
                  onValueChange={(value) => setEscolaSelecionada(value)}
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
                  onValueChange={(value) => setFornecedorSelecionado(value)}
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
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Itens de Capital
            </CardTitle>
            <Boxes className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{itemsWithRelations.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Escolas com Patrimônio
            </CardTitle>
            <Boxes className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEscolasComPatrimonio}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Fornecedores Relacionados
            </CardTitle>
            <Boxes className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFornecedoresRelacionados}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Lista de Itens de Capital</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por patrimônio, nome, escola ou fornecedor..."
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
                <TableHead>Número Patrimônio</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Escola</TableHead>
                <TableHead>Fornecedor</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItens.map((item) => (
                <TableRow key={item.id_item_capital}>
                  <TableCell className="font-mono text-sm">
                    {item.numero_patrimonio}
                  </TableCell>
                  <TableCell className="font-medium">{item.nome}</TableCell>
                  <TableCell>{item.descricao ?? "-"}</TableCell>
                  <TableCell>{item.escola?.nome ?? "-"}</TableCell>
                  <TableCell>{item.fornecedor?.nome ?? "-"}</TableCell>
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
