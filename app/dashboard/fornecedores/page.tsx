"use client"

import * as React from "react"
import {
  Truck,
  Plus,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  Phone,
  Mail,
  Building,
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

const fornecedores = [
  { id: 1, nome: "Papelaria Central", cnpj: "12.345.678/0001-90", contato: "João Silva", telefone: "(11) 99999-1234", email: "contato@papelariacentral.com.br", categoria: "Papelaria", status: "Ativo" },
  { id: 2, nome: "Limpeza Total", cnpj: "23.456.789/0001-01", contato: "Maria Santos", telefone: "(11) 98888-5678", email: "vendas@limpezatotal.com.br", categoria: "Limpeza", status: "Ativo" },
  { id: 3, nome: "InfoTech Equipamentos", cnpj: "34.567.890/0001-12", contato: "Carlos Oliveira", telefone: "(11) 97777-9012", email: "comercial@infotech.com.br", categoria: "Informática", status: "Ativo" },
  { id: 4, nome: "Móveis Escolares Ltda", cnpj: "45.678.901/0001-23", contato: "Ana Costa", telefone: "(11) 96666-3456", email: "vendas@moveisescolares.com.br", categoria: "Mobiliário", status: "Inativo" },
  { id: 5, nome: "Distribuidora Escolar", cnpj: "56.789.012/0001-34", contato: "Pedro Lima", telefone: "(11) 95555-7890", email: "pedidos@distescolar.com.br", categoria: "Diversos", status: "Ativo" },
]

export default function FornecedoresPage() {
  const [searchTerm, setSearchTerm] = React.useState("")

  const filteredFornecedores = fornecedores.filter(
    (forn) =>
      forn.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      forn.cnpj.includes(searchTerm) ||
      forn.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Fornecedores
          </h1>
          <p className="text-muted-foreground">
            Gerencie os fornecedores cadastrados no sistema
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Fornecedor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Novo Fornecedor</DialogTitle>
              <DialogDescription>
                Cadastre um novo fornecedor no sistema.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="nome">Nome/Razão Social</Label>
                <Input id="nome" placeholder="Nome do fornecedor" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input id="cnpj" placeholder="00.000.000/0001-00" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="contato">Pessoa de Contato</Label>
                  <Input id="contato" placeholder="Nome do contato" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input id="telefone" placeholder="(00) 00000-0000" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="email@exemplo.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="categoria">Categoria</Label>
                <Input id="categoria" placeholder="Ex: Papelaria, Limpeza..." />
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
              Total de Fornecedores
            </CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fornecedores.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Fornecedores Ativos
            </CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {fornecedores.filter((f) => f.status === "Ativo").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Categorias
            </CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(fornecedores.map((f) => f.categoria)).size}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Inativos
            </CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {fornecedores.filter((f) => f.status === "Inativo").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Lista de Fornecedores</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar fornecedor..."
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
                <TableHead>CNPJ</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFornecedores.map((forn) => (
                <TableRow key={forn.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{forn.nome}</p>
                      <p className="text-xs text-muted-foreground">{forn.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{forn.cnpj}</TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{forn.contato}</p>
                      <p className="text-xs text-muted-foreground">{forn.telefone}</p>
                    </div>
                  </TableCell>
                  <TableCell>{forn.categoria}</TableCell>
                  <TableCell>
                    <Badge
                      variant={forn.status === "Ativo" ? "default" : "secondary"}
                    >
                      {forn.status}
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
                          <Phone className="mr-2 h-4 w-4" />
                          Ligar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Enviar E-mail
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
