"use client"

import * as React from "react"
import {
  MapPin,
  Plus,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  Building2,
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

const localizacoes = [
  { id: 1, nome: "Almoxarifado Central", tipo: "Almoxarifado", escola: "Monte Azul", capacidade: 500, itens: 342, status: "Ativo" },
  { id: 2, nome: "Sala de Materiais", tipo: "Sala", escola: "São João", capacidade: 200, itens: 156, status: "Ativo" },
  { id: 3, nome: "Depósito de Limpeza", tipo: "Depósito", escola: "Dom Pedro", capacidade: 100, itens: 78, status: "Ativo" },
  { id: 4, nome: "Laboratório de Informática", tipo: "Laboratório", escola: "Monte Azul", capacidade: 50, itens: 45, status: "Ativo" },
  { id: 5, nome: "Biblioteca", tipo: "Biblioteca", escola: "São João", capacidade: 1000, itens: 856, status: "Ativo" },
  { id: 6, nome: "Sala dos Professores", tipo: "Sala", escola: "Dom Pedro", capacidade: 30, itens: 25, status: "Inativo" },
]

export default function LocalizacoesPage() {
  const [searchTerm, setSearchTerm] = React.useState("")

  const filteredLocalizacoes = localizacoes.filter(
    (loc) =>
      loc.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.escola.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Localizações
          </h1>
          <p className="text-muted-foreground">
            Gerencie os locais de armazenamento do estoque
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Localização
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nova Localização</DialogTitle>
              <DialogDescription>
                Adicione um novo local de armazenamento ao sistema.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="nome">Nome</Label>
                <Input id="nome" placeholder="Nome da localização" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tipo">Tipo</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="almoxarifado">Almoxarifado</SelectItem>
                    <SelectItem value="sala">Sala</SelectItem>
                    <SelectItem value="deposito">Depósito</SelectItem>
                    <SelectItem value="laboratorio">Laboratório</SelectItem>
                    <SelectItem value="biblioteca">Biblioteca</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="escola">Escola</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a escola" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monte-azul">Monte Azul</SelectItem>
                    <SelectItem value="sao-joao">São João</SelectItem>
                    <SelectItem value="dom-pedro">Dom Pedro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="capacidade">Capacidade</Label>
                <Input id="capacidade" type="number" placeholder="Capacidade máxima" />
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
              Total de Locais
            </CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{localizacoes.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Locais Ativos
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {localizacoes.filter((l) => l.status === "Ativo").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Capacidade Total
            </CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {localizacoes.reduce((acc, l) => acc + l.capacidade, 0).toLocaleString("pt-BR")}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Itens Armazenados
            </CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {localizacoes.reduce((acc, l) => acc + l.itens, 0).toLocaleString("pt-BR")}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Lista de Localizações</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar localização..."
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
                <TableHead>Nome</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Escola</TableHead>
                <TableHead className="text-right">Capacidade</TableHead>
                <TableHead className="text-right">Itens</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLocalizacoes.map((loc) => (
                <TableRow key={loc.id}>
                  <TableCell className="font-medium">{loc.nome}</TableCell>
                  <TableCell>{loc.tipo}</TableCell>
                  <TableCell>{loc.escola}</TableCell>
                  <TableCell className="text-right">{loc.capacidade}</TableCell>
                  <TableCell className="text-right">{loc.itens}</TableCell>
                  <TableCell>
                    <Badge
                      variant={loc.status === "Ativo" ? "default" : "secondary"}
                    >
                      {loc.status}
                    </Badge>
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
