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
import { escolas, itensConsumo, itensCapital, Log_saida } from "@/lib/mock-data"
import { StatusBadge } from "@/components/shared"


export default function LogsSaidaPage() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [filtroEscola, setFiltroEscola] = React.useState("todas")
  const [logs, setLogs] = React.useState<Log_saida[]>([])
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    let isActive = true

    async function loadLogs() {
      setLoading(true)

      try {
        const response = await fetch("/api/movimentacoes/requests")
        if (!response.ok) return

        const data = await response.json()
        const requests = Array.isArray(data.requests) ? data.requests : []

        const normalizedLogs = requests.map((request: any) => {
          const escola = escolas.find((item) => item.id_escola === request.id_escola)
          const consumoItem = itensConsumo.find((item) => item.id_item_consumo === request.id_item_consumo)
          const capitalIds = Array.isArray(request.id_itens_capital) ? request.id_itens_capital : []
          const capitalItems = itensCapital.filter((item) => capitalIds.includes(item.id_item_capital))

          const itemType = request.itemType === "capital" ? "capital" : "consumo"
          const patrimonioLabel =
            itemType === "capital"
              ? capitalItems.length > 0
                ? capitalItems.map((item) => item.numero_patrimonio).join(", ")
                : Array.isArray(request.numeros_patrimonio) && request.numeros_patrimonio.length > 0
                  ? request.numeros_patrimonio.join(", ")
                  : request.numero_patrimonio ?? null
              : null

          return {
            id: request.id,
            criado_em: request.criado_em,
            tipo: request.tipo === "emprestimo" ? "emprestimo" : "saida",
            status: request.status === "approved" || request.status === "rejected" ? request.status : "pending",
            itemType,
            itemNome:
              itemType === "capital"
                ? capitalItems[0]?.nome ?? "Itens de capital"
                : consumoItem?.nome ?? "Item de consumo",
            escolaNome: escola?.nome.replace("Escola Municipal ", "") ?? "Escola não informada",
            solicitante: request.id_usuario ? `Usuário ${request.id_usuario}` : "Sistema",
            destino: itemType === "capital" ? "Patrimônio" : "Estoque",
            motivo:
              request.observacao ??
              (request.status === "approved"
                ? "Solicitação aprovada"
                : request.status === "rejected"
                  ? "Solicitação recusada"
                  : "Solicitação pendente"),
            quantidadeLabel:
              itemType === "consumo"
                ? `${Number(request.quantidade) || 0} un.`
                : `${capitalIds.length || (Array.isArray(request.numeros_patrimonio) ? request.numeros_patrimonio.length : 1)} patrimônio(s)`,
            patrimonioLabel,
          }
        })

        if (isActive) {
          setLogs(normalizedLogs)
        }
      } finally {
        if (isActive) {
          setLoading(false)
        }
      }
    }

    void loadLogs()

    return () => {
      isActive = false
    }
  }, [])

  const filteredLogs = logs.filter((log) => {
    const matchSearch =
      log.itemNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.solicitante.toLowerCase().includes(searchTerm.toLowerCase()) ||
    const matchEscola = filtroEscola === "todas" || log.escola === filtroEscola
    return matchSearch && matchEscola
  })

  const totalSaidas = logs.length
  const saidasHoje = logs.filter((log) => {
    const today = new Date().toLocaleDateString("pt-BR")
    return new Date(log.criado_em).toLocaleDateString("pt-BR") === today
  }).length
  const pendentes = logs.filter((log) => log.status === "pending").length
  const recusadas = logs.filter((log) => log.status === "rejected").length

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
              Pendentes
            </CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendentes}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Recusadas
            </CardTitle>
            <ArrowDownRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recusadas}</div>
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
          {loading ? (
            <div className="rounded-lg border border-dashed border-border bg-muted/20 p-6 text-sm text-muted-foreground">
              Carregando histórico...
            </div>
          ) : null}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data/Hora</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Quantidade / Patrimônio</TableHead>
                <TableHead>Escola</TableHead>
                <TableHead>Solicitante</TableHead>
                <TableHead>Destino</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Motivo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-sm">
                    {new Date(log.criado_em).toLocaleString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  <TableCell className="font-medium">{log.itemNome}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-muted text-foreground">
                      {log.itemType === "capital" ? "Capital" : "Consumo"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={log.itemType === "capital" ? "text-foreground" : "text-destructive font-semibold"}>
                      {log.itemType === "capital" ? log.patrimonioLabel ?? log.quantidadeLabel : `-${log.quantidadeLabel}`}
                    </span>
                  </TableCell>
                  <TableCell>{log.escolaNome}</TableCell>
                  <TableCell>{log.solicitante}</TableCell>
                  <TableCell>
                    <StatusBadge
                      status={
                        log.status === "approved"
                          ? "approved"
                          : log.status === "rejected"
                            ? "rejected"
                            : "pending"
                      }
                    >
                      {log.status === "approved"
                        ? "Aprovada"
                        : log.status === "rejected"
                          ? "Recusada"
                          : "Pendente"}
                    </StatusBadge>
                  </TableCell>
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
