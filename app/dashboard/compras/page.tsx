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
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
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

const compras = [
  { id: 1, numero: "OC-2024-001", fornecedor: "Papelaria Central", data: "28/05/2024", valorTotal: 2450.00, itens: 15, status: "Entregue" },
  { id: 2, numero: "OC-2024-002", fornecedor: "Limpeza Total", data: "25/05/2024", valorTotal: 1890.00, itens: 8, status: "Entregue" },
  { id: 3, numero: "OC-2024-003", fornecedor: "InfoTech Equipamentos", data: "20/05/2024", valorTotal: 8500.00, itens: 3, status: "Em Trânsito" },
  { id: 4, numero: "OC-2024-004", fornecedor: "Distribuidora Escolar", data: "18/05/2024", valorTotal: 3200.00, itens: 22, status: "Pendente" },
  { id: 5, numero: "OC-2024-005", fornecedor: "Papelaria Central", data: "15/05/2024", valorTotal: 1250.00, itens: 10, status: "Cancelada" },
  { id: 6, numero: "OC-2024-006", fornecedor: "Móveis Escolares Ltda", data: "10/05/2024", valorTotal: 15800.00, itens: 25, status: "Entregue" },
]

export default function ComprasPage() {
  const [searchTerm, setSearchTerm] = React.useState("")

  const filteredCompras = compras.filter(
    (compra) =>
      compra.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      compra.fornecedor.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Entregue":
        return <Badge className="bg-green-500 text-white hover:bg-green-600"><CheckCircle2 className="mr-1 h-3 w-3" />Entregue</Badge>
      case "Em Trânsito":
        return <Badge className="bg-blue-500 text-white hover:bg-blue-600"><Clock className="mr-1 h-3 w-3" />Em Trânsito</Badge>
      case "Pendente":
        return <Badge className="bg-yellow-500 text-white hover:bg-yellow-600"><Clock className="mr-1 h-3 w-3" />Pendente</Badge>
      case "Cancelada":
        return <Badge variant="destructive"><XCircle className="mr-1 h-3 w-3" />Cancelada</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const valorTotal = compras
    .filter((c) => c.status !== "Cancelada")
    .reduce((acc, c) => acc + c.valorTotal, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Compras
          </h1>
          <p className="text-muted-foreground">
            Gerencie as ordens de compra e pedidos
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Compra
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Nova Ordem de Compra</DialogTitle>
              <DialogDescription>
                Crie uma nova ordem de compra no sistema.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="fornecedor">Fornecedor</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o fornecedor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="papelaria">Papelaria Central</SelectItem>
                    <SelectItem value="limpeza">Limpeza Total</SelectItem>
                    <SelectItem value="infotech">InfoTech Equipamentos</SelectItem>
                    <SelectItem value="distribuidora">Distribuidora Escolar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="escola">Escola Destino</Label>
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
                <Label htmlFor="observacoes">Observações</Label>
                <Input id="observacoes" placeholder="Observações adicionais..." />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Criar Ordem</Button>
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
              Valor Total
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
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
              Pendentes
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {compras.filter((c) => c.status === "Pendente" || c.status === "Em Trânsito").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Entregues
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {compras.filter((c) => c.status === "Entregue").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Ordens de Compra</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar ordem..."
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
                <TableHead>Número</TableHead>
                <TableHead>Fornecedor</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Itens</TableHead>
                <TableHead className="text-right">Valor Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCompras.map((compra) => (
                <TableRow key={compra.id}>
                  <TableCell className="font-mono text-sm font-medium">{compra.numero}</TableCell>
                  <TableCell>{compra.fornecedor}</TableCell>
                  <TableCell>{compra.data}</TableCell>
                  <TableCell className="text-right">{compra.itens}</TableCell>
                  <TableCell className="text-right">
                    R$ {compra.valorTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell>{getStatusBadge(compra.status)}</TableCell>
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
                          <FileText className="mr-2 h-4 w-4" />
                          Gerar PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Cancelar
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
