"use client"

import * as React from "react"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
 
  ArrowUpRight,
  Download,
  BookOpen,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { Textarea } from "@/components/ui/textarea"
import { PageHeader, StatusBadge } from "@/components/shared"
import { ultimasMovimentacoes, escolas, itensConsumo, itensCapital } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export default function MovimentacoesPage() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false)
  const [tipoMovimentacao, setTipoMovimentacao] = React.useState<string>("")

  // form state for creating requests
  const [itemType, setItemType] = React.useState<'consumo'|'capital'>('consumo')
  const [selectedConsumoId, setSelectedConsumoId] = React.useState<number | null>(null)
  const [selectedCapitalId, setSelectedCapitalId] = React.useState<number | null>(null)
  const [selectedEscolaId, setSelectedEscolaId] = React.useState<number | null>(null)
  const [quantidade, setQuantidade] = React.useState<number | null>(null)
  const [observacao, setObservacao] = React.useState<string | null>(null)
  const currentUserId = 2 // mock current user

  const filteredMovimentacoes = ultimasMovimentacoes.filter(
    (mov) =>
      mov.item?.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mov.escola?.nome.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title="Movimentações"
        description="Histórico de entradas e saídas do estoque"
      >
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nova Movimentação
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Registrar Movimentação</DialogTitle>
                <DialogDescription>
                  Registre uma entrada ou saída de item no estoque.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Tipo de Movimentação</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setTipoMovimentacao("emprestimo")}
                      className={cn(
                        "flex items-center justify-center gap-2 rounded-lg border-2 p-4 transition-colors",
                        tipoMovimentacao === "emprestimo"
                          ? "border-success bg-success/10 text-success"
                          : "border-border hover:border-muted-foreground"
                      )}
                    >
                      <img
                        src="/aperto-de-mao.png"
                        alt="Aperto de mão"
                        className="h-5 w-5 object-contain"
                      />
                      <span className="font-medium">Emprestimo</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTipoMovimentacao("saida")}
                      className={cn(
                        "flex items-center justify-center gap-2 rounded-lg border-2 p-4 transition-colors",
                        tipoMovimentacao === "saida"
                          ? "border-destructive bg-destructive/10 text-destructive"
                          : "border-border hover:border-muted-foreground"
                      )}
                    >
                      <ArrowUpRight className="h-5 w-5" />
                      <span className="font-medium">Saída</span>
                    </button>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="item">Item</Label>
                  <div className="flex gap-2 items-center">
                    <select
                      value={itemType}
                      onChange={(e) => setItemType(e.target.value as any)}
                      className="rounded-md border px-2 py-1"
                    >
                      <option value="consumo">Consumo</option>
                      <option value="capital">Capital</option>
                    </select>
                    {itemType === 'consumo' ? (
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o item" />
                        </SelectTrigger>
                        <SelectContent>
                          {itensConsumo.map((item) => (
                            <SelectItem
                              key={item.id_item_consumo}
                              value={item.id_item_consumo.toString()}
                              onClick={() => setSelectedConsumoId(item.id_item_consumo)}
                            >
                              {item.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o item de capital" />
                        </SelectTrigger>
                        <SelectContent>
                          {/* import itensCapital dynamically to avoid heavy bundles */}
                          {itensCapital.map((item: any) => (
                            <SelectItem
                              key={item.id_item_capital}
                              value={item.id_item_capital.toString()}
                              onClick={() => setSelectedCapitalId(item.id_item_capital)}
                            >
                              {item.nome} — {item.numero_patrimonio}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
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
                        {escolas.map((escola) => (
                          <SelectItem
                            key={escola.id_escola}
                            value={escola.id_escola.toString()}
                            onClick={() => setSelectedEscolaId(escola.id_escola)}
                          >
                            {escola.nome.replace("Escola Municipal ", "")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="quantidade">Quantidade</Label>
                    <Input id="quantidade" type="number" placeholder="0" min={1} value={quantidade ?? ''} onChange={(e) => setQuantidade(Number(e.target.value) || null)} />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="observacao">Observação (opcional)</Label>
                  <Textarea
                    id="observacao"
                    placeholder="Adicione uma observação..."
                    className="resize-none"
                    value={observacao ?? ''}
                    onChange={(e) => setObservacao(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button onClick={async () => {
                  // build payload
                  const payload: any = {
                    tipo: tipoMovimentacao || 'saida',
                    itemType,
                    id_item_consumo: itemType === 'consumo' ? selectedConsumoId : null,
                    id_item_capital: itemType === 'capital' ? selectedCapitalId : null,
                    numero_patrimonio: null,
                    quantidade: quantidade,
                    id_escola: selectedEscolaId,
                    id_usuario: currentUserId,
                    observacao: observacao,
                  }

                  if (itemType === 'capital' && payload.id_item_capital) {
                    const found = itensCapital.find((i: any) => i.id_item_capital === payload.id_item_capital)
                    payload.numero_patrimonio = found ? found.numero_patrimonio : null
                  }

                  try {
                    const res = await fetch('/api/movimentacoes/requests', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(payload),
                    })
                    if (res.ok) {
                      alert('Solicitação enviada para aprovação do administrador.')
                    } else {
                      alert('Falha ao enviar solicitação')
                    }
                  } catch (e) {
                    alert('Erro ao enviar solicitação')
                  }

                  setIsCreateDialogOpen(false)
                }}>
                  Registrar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </PageHeader>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar movimentações..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <Select>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="entrada">Entradas</SelectItem>
              <SelectItem value="saida">Saídas</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Escola" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as escolas</SelectItem>
              {escolas.map((escola) => (
                <SelectItem
                  key={escola.id_escola}
                  value={escola.id_escola.toString()}
                >
                  {escola.nome.replace("Escola Municipal ", "")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Data/Hora
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Escola
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Usuário
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Quantidade
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredMovimentacoes.map((mov) => (
                <tr key={mov.id_movimentacao} className="hover:bg-muted/30">
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">
                    {new Date(mov.criado_em).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <StatusBadge status={mov.tipo}>
                      {mov.tipo === "entrada" ? "Entrada" : "Saída"}
                    </StatusBadge>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-foreground">
                    {mov.item?.nome}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">
                    {mov.escola?.nome?.replace("Escola Municipal ", "")}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">
                    {mov.usuario?.email
                      ?.split("@")[0]
                      .replace(".", " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </td>
                  <td
                    className={cn(
                      "whitespace-nowrap px-6 py-4 text-right text-sm font-semibold",
                      mov.tipo === "entrada" ? "text-success" : "text-destructive"
                    )}
                  >
                    {mov.tipo === "entrada" ? "+" : "-"}
                    {mov.quantidade} un.
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Abrir menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver Detalhes
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-border bg-muted/30 px-6 py-3">
          <p className="text-sm text-muted-foreground">
            Mostrando{" "}
            <span className="font-medium">{filteredMovimentacoes.length}</span> de{" "}
            <span className="font-medium">{ultimasMovimentacoes.length}</span>{" "}
            movimentações
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Anterior
            </Button>
            <Button variant="outline" size="sm" disabled>
              Próximo
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
