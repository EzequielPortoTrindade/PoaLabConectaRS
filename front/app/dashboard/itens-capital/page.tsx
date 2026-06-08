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
  AlertTriangle,
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

const itensCapital = [
  { id: 1, patrimonio: "PAT-001234", nome: "Computador Desktop Dell", categoria: "Informática", escola: "Monte Azul", localizacao: "Lab. Informática", valor: 3500.00, dataAquisicao: "15/03/2023", estado: "Bom" },
  { id: 2, patrimonio: "PAT-001235", nome: "Projetor Epson", categoria: "Audiovisual", escola: "São João", localizacao: "Sala 05", valor: 2800.00, dataAquisicao: "20/04/2023", estado: "Bom" },
  { id: 3, patrimonio: "PAT-001236", nome: "Impressora HP LaserJet", categoria: "Informática", escola: "Dom Pedro", localizacao: "Secretaria", valor: 1500.00, dataAquisicao: "10/05/2023", estado: "Regular" },
  { id: 4, patrimonio: "PAT-001237", nome: "Mesa de Professor", categoria: "Mobiliário", escola: "Monte Azul", localizacao: "Sala 03", valor: 450.00, dataAquisicao: "05/01/2023", estado: "Bom" },
  { id: 5, patrimonio: "PAT-001238", nome: "Ar Condicionado Split", categoria: "Climatização", escola: "São João", localizacao: "Sala dos Professores", valor: 2200.00, dataAquisicao: "12/06/2023", estado: "Bom" },
  { id: 6, patrimonio: "PAT-001239", nome: "Cadeira Giratória", categoria: "Mobiliário", escola: "Dom Pedro", localizacao: "Biblioteca", valor: 380.00, dataAquisicao: "18/02/2023", estado: "Ruim" },
]

export default function ItensCapitalPage() {
  const [searchTerm, setSearchTerm] = React.useState("")

  const filteredItens = itensCapital.filter(
    (item) =>
      item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.patrimonio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "Bom":
        return <Badge className="bg-green-500 text-white hover:bg-green-600">Bom</Badge>
      case "Regular":
        return <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">Regular</Badge>
      case "Ruim":
        return <Badge variant="destructive">Ruim</Badge>
      default:
        return <Badge variant="secondary">{estado}</Badge>
    }
  }

  const valorTotal = itensCapital.reduce((acc, item) => acc + item.valor, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Itens de Capital
          </h1>
          <p className="text-muted-foreground">
            Gerencie os bens patrimoniais das escolas
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Novo Item de Capital</DialogTitle>
              <DialogDescription>
                Cadastre um novo bem patrimonial no sistema.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="patrimonio">N. Patrimônio</Label>
                  <Input id="patrimonio" placeholder="PAT-000000" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="valor">Valor (R$)</Label>
                  <Input id="valor" type="number" placeholder="0,00" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="nome">Descrição</Label>
                <Input id="nome" placeholder="Nome/descrição do item" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="categoria">Categoria</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="informatica">Informática</SelectItem>
                      <SelectItem value="audiovisual">Audiovisual</SelectItem>
                      <SelectItem value="mobiliario">Mobiliário</SelectItem>
                      <SelectItem value="climatizacao">Climatização</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="estado">Estado</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bom">Bom</SelectItem>
                      <SelectItem value="regular">Regular</SelectItem>
                      <SelectItem value="ruim">Ruim</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="escola">Escola</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monte-azul">Monte Azul</SelectItem>
                      <SelectItem value="sao-joao">São João</SelectItem>
                      <SelectItem value="dom-pedro">Dom Pedro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="localizacao">Localização</Label>
                  <Input id="localizacao" placeholder="Sala/Local" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Itens
            </CardTitle>
            <Boxes className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{itensCapital.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Valor Total
            </CardTitle>
            <Boxes className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {valorTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Em Bom Estado
            </CardTitle>
            <Boxes className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {itensCapital.filter((i) => i.estado === "Bom").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Necessitam Reparo
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {itensCapital.filter((i) => i.estado === "Ruim" || i.estado === "Regular").length}
            </div>
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
                placeholder="Buscar item..."
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
                <TableHead>Patrimônio</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Escola</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItens.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono text-sm">{item.patrimonio}</TableCell>
                  <TableCell className="font-medium">{item.nome}</TableCell>
                  <TableCell>{item.categoria}</TableCell>
                  <TableCell>{item.escola}</TableCell>
                  <TableCell>{item.localizacao}</TableCell>
                  <TableCell className="text-right">
                    R$ {item.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell>{getEstadoBadge(item.estado)}</TableCell>
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
                          Ver Detalhes
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
