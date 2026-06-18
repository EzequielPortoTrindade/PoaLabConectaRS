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
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { PageHeader, StatusBadge } from "@/components/shared"
import { ultimasMovimentacoes, escolas, itensConsumo, itensCapital } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export default function MovimentacoesPage() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false)
  const [tipoMovimentacao, setTipoMovimentacao] = React.useState<string>("")
  const [requests, setRequests] = React.useState<any[]>([])
  const [requestsLoading, setRequestsLoading] = React.useState(false)
  const [requestActionId, setRequestActionId] = React.useState<string | null>(null)

  // form state for creating requests
  const [itemType, setItemType] = React.useState<'consumo'|'capital'>('consumo')
  const [selectedConsumoId, setSelectedConsumoId] = React.useState<number | null>(null)
  const [selectedCapitalIds, setSelectedCapitalIds] = React.useState<number[]>([])
  const [selectedEscolaId, setSelectedEscolaId] = React.useState<number | null>(null)
  const [quantidade, setQuantidade] = React.useState<number | null>(null)
  const [observacao, setObservacao] = React.useState<string | null>(null)
  const currentUserId = 2 // mock current user

  React.useEffect(() => {
    if (itemType === 'capital') {
      setQuantidade(null)
      setSelectedConsumoId(null)
      return
    }

    setSelectedCapitalIds([])
  }, [itemType])

  const loadRequests = React.useCallback(async () => {
    setRequestsLoading(true)

    try {
      const response = await fetch('/api/movimentacoes/requests')
      if (!response.ok) return

      const data = await response.json()
      setRequests(Array.isArray(data.requests) ? data.requests : [])
    } finally {
      setRequestsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    void loadRequests()
  }, [loadRequests])

  const handleRequestAction = React.useCallback(async (requestId: string, action: 'approve' | 'reject') => {
    setRequestActionId(requestId)

    try {
      const response = await fetch(`/api/movimentacoes/requests/${requestId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, adminId: currentUserId }),
      })

      if (!response.ok) {
        alert('Não foi possível atualizar a solicitação.')
        return
      }

      await loadRequests()
    } catch (error) {
      alert('Não foi possível atualizar a solicitação.')
    } finally {
      setRequestActionId(null)
    }
  }, [currentUserId, loadRequests])

  const getRequestSummary = React.useCallback((request: any) => {
    const items: string[] = []

    if (request.itemType === 'consumo') {
      const consumo = itensConsumo.find((item) => item.id_item_consumo === request.id_item_consumo)
      if (consumo) items.push(consumo.nome)
      if (request.quantidade) items.push(`${request.quantidade} un.`)
    }

    if (request.itemType === 'capital') {
      const capitalIds = Array.isArray(request.id_itens_capital) ? request.id_itens_capital : []
      const selectedCapitalItems = itensCapital.filter((item) => capitalIds.includes(item.id_item_capital))

      if (selectedCapitalItems.length > 0) {
        items.push(...selectedCapitalItems.map((item) => `${item.nome} (${item.numero_patrimonio})`))
      } else if (Array.isArray(request.numeros_patrimonio)) {
        items.push(...request.numeros_patrimonio.map((numero: string) => `Patrimônio ${numero}`))
      } else if (request.numero_patrimonio) {
        items.push(`Patrimônio ${request.numero_patrimonio}`)
      }
    }

    return items.join(' • ') || 'Itens não informados'
  }, [])

  const getRequesterLabel = React.useCallback((request: any) => {
    if (!request.id_usuario) return 'Administrador'

    return `Usuário ${request.id_usuario}`
  }, [])

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
                      onChange={(e) => setItemType(e.target.value as 'consumo' | 'capital')}
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
                      <div className="rounded-md border border-dashed px-3 py-2 text-sm text-muted-foreground">
                        A seleção de Capital é feita pela lista de patrimônios abaixo.
                      </div>
                    )}
                  </div>
                  {itemType === 'capital' ? (
                    <div className="rounded-lg border bg-muted/20 p-3">
                      <p className="text-sm text-muted-foreground">
                        Selecione um ou mais números de patrimônio para a retirada.
                      </p>
                      <div className="mt-3 max-h-56 space-y-2 overflow-y-auto pr-1">
                        {itensCapital.map((item) => {
                          const isSelected = selectedCapitalIds.includes(item.id_item_capital)

                          return (
                            <label
                              key={item.id_item_capital}
                              className={cn(
                                "flex cursor-pointer items-start gap-3 rounded-md border p-3 transition-colors",
                                isSelected
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-muted-foreground"
                              )}
                            >
                              <Checkbox
                                checked={isSelected}
                                onCheckedChange={(checked) => {
                                  setSelectedCapitalIds((current) =>
                                    checked
                                      ? [...current, item.id_item_capital]
                                      : current.filter((id) => id !== item.id_item_capital)
                                  )
                                }}
                                className="mt-0.5"
                              />
                              <div className="min-w-0 flex-1">
                                <div className="font-medium leading-none">{item.nome}</div>
                                <div className="mt-1 text-sm text-muted-foreground">
                                  Patrimônio {item.numero_patrimonio}
                                </div>
                              </div>
                            </label>
                          )
                        })}
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className={cn("grid gap-4", itemType === 'capital' ? "grid-cols-1" : "grid-cols-2") }>
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
                  {itemType === 'consumo' ? (
                    <div className="grid gap-2">
                      <Label htmlFor="quantidade">Quantidade</Label>
                      <Input
                        id="quantidade"
                        type="number"
                        placeholder="0"
                        min={1}
                        value={quantidade ?? ''}
                        onChange={(e) => setQuantidade(Number(e.target.value) || null)}
                      />
                    </div>
                  ) : null}
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
                  const selectedCapitalItems = itensCapital.filter((item) =>
                    selectedCapitalIds.includes(item.id_item_capital)
                  )

                  const payload: any = {
                    tipo: tipoMovimentacao || 'saida',
                    itemType,
                    id_item_consumo: itemType === 'consumo' ? selectedConsumoId : null,
                    id_item_capital: itemType === 'capital' ? selectedCapitalIds[0] ?? null : null,
                    id_itens_capital: itemType === 'capital' ? selectedCapitalIds : null,
                    numero_patrimonio:
                      itemType === 'capital' ? selectedCapitalItems[0]?.numero_patrimonio ?? null : null,
                    numeros_patrimonio:
                      itemType === 'capital'
                        ? selectedCapitalItems.map((item) => item.numero_patrimonio).filter(Boolean)
                        : null,
                    quantidade: itemType === 'consumo' ? quantidade : null,
                    id_escola: selectedEscolaId,
                    id_usuario: currentUserId,
                    observacao: observacao,
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
              <SelectItem value="emprestimo">Empréstimos</SelectItem>
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
                      {mov.tipo === "emprestimo" ? "Empréstimo" : "Saída"}
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
                      mov.tipo === "emprestimo" ? "text-success" : "text-destructive"
                    )}
                  >
                    {mov.tipo === "emprestimo" ? "+" : "-"}
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

      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Solicitações recebidas</h2>
            <p className="text-sm text-muted-foreground">
              Requisições de saída e empréstimo enviadas pelo backend para aprovação.
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            {requests.filter((request) => request.status === 'pending').length} pendentes
          </p>
        </div>

        {requestsLoading ? (
          <div className="rounded-lg border border-dashed border-border bg-muted/20 p-6 text-sm text-muted-foreground">
            Carregando solicitações...
          </div>
        ) : requests.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-muted/20 p-6 text-sm text-muted-foreground">
            Nenhuma solicitação recebida no momento.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Data/Hora
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Tipo
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Itens solicitados
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Solicitante
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {requests
                  .slice()
                  .sort((left, right) => Number(new Date(right.criado_em)) - Number(new Date(left.criado_em)))
                  .map((request) => {
                    const isPending = request.status === 'pending'
                    const isBusy = requestActionId === request.id

                    return (
                      <tr key={request.id} className="hover:bg-muted/30">
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-muted-foreground">
                          {new Date(request.criado_em).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <StatusBadge status={request.tipo === 'emprestimo' ? 'emprestimo' : 'saida'}>
                            {request.tipo === 'emprestimo' ? 'Empréstimo' : 'Saída'}
                          </StatusBadge>
                        </td>
                        <td className="px-4 py-4 text-sm text-foreground">
                          <div className="max-w-[320px] space-y-1">
                            <p className="font-medium">
                              {request.itemType === 'capital' ? 'Capital' : 'Consumo'}
                            </p>
                            <p className="text-sm text-muted-foreground">{getRequestSummary(request)}</p>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-muted-foreground">
                          {getRequesterLabel(request)}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <StatusBadge status={request.status === 'approved' ? 'approved' : request.status === 'rejected' ? 'rejected' : 'pending'}>
                            {request.status === 'approved'
                              ? 'Aprovada'
                              : request.status === 'rejected'
                                ? 'Recusada'
                                : 'Pendente'}
                          </StatusBadge>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            {isPending ? (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-success/30 text-success hover:bg-success/10"
                                  disabled={isBusy}
                                  onClick={() => handleRequestAction(request.id, 'approve')}
                                >
                                  Aprovar
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-destructive/30 text-destructive hover:bg-destructive/10"
                                  disabled={isBusy}
                                  onClick={() => handleRequestAction(request.id, 'reject')}
                                >
                                  Rejeitar
                                </Button>
                              </>
                            ) : (
                              <span className="text-sm text-muted-foreground">Sem ações disponíveis</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
