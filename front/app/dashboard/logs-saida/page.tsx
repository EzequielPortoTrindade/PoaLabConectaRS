"use client"

import * as React from "react"
import {
  ArrowRightLeft,
  Search,
  Download,
  Filter,
  ArrowDownRight,
  User,
  Calendar,
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

const logsSaida = [
  { id: 1, data: "28/05/2024 15:30", item: "Papel A4", quantidade: 10, unidade: "resmas", escola: "Monte Azul", solicitante: "Maria Silva", destino: "Secretaria", motivo: "Impressão de relatórios" },
  { id: 2, data: "28/05/2024 14:15", item: "Lápis Preto", quantidade: 50, unidade: "un", escola: "São João", solicitante: "João Santos", destino: "Sala 05", motivo: "Atividade em sala" },
  { id: 3, data: "27/05/2024 16:45", item: "Álcool 70%", quantidade: 5, unidade: "L", escola: "Dom Pedro", solicitante: "Ana Costa", destino: "Limpeza", motivo: "Limpeza diária" },
  { id: 4, data: "27/05/2024 11:20", item: "Detergente", quantidade: 3, unidade: "un", escola: "Monte Azul", solicitante: "Pedro Lima", destino: "Cozinha", motivo: "Reposição" },
  { id: 5, data: "26/05/2024 09:30", item: "Toner HP 85A", quantidade: 2, unidade: "un", escola: "São João", solicitante: "Carlos Oliveira", destino: "Lab. Informática", motivo: "Troca de cartucho" },
  { id: 6, data: "26/05/2024 08:00", item: "Caneta Esferográfica", quantidade: 30, unidade: "un", escola: "Dom Pedro", solicitante: "Maria Silva", destino: "Sala dos Professores", motivo: "Distribuição" },
  { id: 7, data: "25/05/2024 14:00", item: "Borracha Branca", quantidade: 20, unidade: "un", escola: "Monte Azul", solicitante: "João Santos", destino: "Sala 03", motivo: "Material escolar" },
  { id: 8, data: "25/05/2024 10:45", item: "Desinfetante", quantidade: 4, unidade: "L", escola: "São João", solicitante: "Ana Costa", destino: "Banheiros", motivo: "Limpeza semanal" },
]

export default function LogsSaidaPage() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [filtroEscola, setFiltroEscola] = React.useState("todas")

  const filteredLogs = logsSaida.filter((log) => {
    const matchSearch =
      log.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.solicitante.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.destino.toLowerCase().includes(searchTerm.toLowerCase())
    const matchEscola = filtroEscola === "todas" || log.escola === filtroEscola
    return matchSearch && matchEscola
  })

  const totalSaidas = logsSaida.length
  const saidasHoje = logsSaida.filter((l) => l.data.includes("28/05/2024")).length

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Logs de Saída
          </h1>
          <p className="text-muted-foreground">
            Histórico de saídas de itens do estoque
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exportar
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Saídas
            </CardTitle>
            <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSaidas}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Saídas Hoje
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{saidasHoje}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Solicitantes
            </CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(logsSaida.map((l) => l.solicitante)).size}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Itens Diferentes
            </CardTitle>
            <ArrowDownRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(logsSaida.map((l) => l.item)).size}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Histórico de Saídas</CardTitle>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filtroEscola} onValueChange={setFiltroEscola}>
                <SelectTrigger className="w-full sm:w-40">
                  <Filter className="mr-2 h-4 w-4" />
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
                <TableHead>Data/Hora</TableHead>
                <TableHead>Item</TableHead>
                <TableHead className="text-right">Quantidade</TableHead>
                <TableHead>Escola</TableHead>
                <TableHead>Solicitante</TableHead>
                <TableHead>Destino</TableHead>
                <TableHead>Motivo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-sm">{log.data}</TableCell>
                  <TableCell className="font-medium">{log.item}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="secondary" className="bg-red-100 text-red-700">
                      -{log.quantidade} {log.unidade}
                    </Badge>
                  </TableCell>
                  <TableCell>{log.escola}</TableCell>
                  <TableCell>{log.solicitante}</TableCell>
                  <TableCell>{log.destino}</TableCell>
                  <TableCell className="max-w-[200px] truncate text-muted-foreground">
                    {log.motivo}
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
