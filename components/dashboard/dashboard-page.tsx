"use client"

import * as React from "react"
import {
  DollarSign,
  Package,
  AlertTriangle,
  ArrowRightLeft,
  Calendar,
  ChevronDown,
  FileText,
  MoreHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PageHeader, StatsCard, StatusBadge } from "@/components/shared"
import {
  MovimentacoesChart,
  EscolasPieChart,
  CategoriasBar,
} from "@/components/charts"
import {
  dashboardStats,
  movimentacoesPeriodo,
  estoqueBaixo,
  resumoEscolas,
  categoriasDestaque,
  ultimasMovimentacoes,
} from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Dashboard"
        description="Visão geral do estoque escolar"
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              01/05/2024 - 31/05/2024
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Últimos 7 dias</DropdownMenuItem>
            <DropdownMenuItem>Últimos 30 dias</DropdownMenuItem>
            <DropdownMenuItem>Este mês</DropdownMenuItem>
            <DropdownMenuItem>Mês anterior</DropdownMenuItem>
            <DropdownMenuItem>Personalizado...</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </PageHeader>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Valor Total em Estoque"
          value={`R$ ${dashboardStats.valor_total_estoque.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}`}
          icon={<DollarSign className="h-6 w-6" />}
          variant="primary"
          trend={{
            value: dashboardStats.variacao_valor,
            label: "vs mês anterior",
            positive: dashboardStats.variacao_valor > 0,
          }}
        />
        <StatsCard
          title="Itens em Estoque"
          value={dashboardStats.total_itens.toLocaleString("pt-BR")}
          icon={<Package className="h-6 w-6" />}
          variant="success"
          trend={{
            value: dashboardStats.variacao_itens,
            label: "vs mês anterior",
            positive: dashboardStats.variacao_itens > 0,
          }}
        />
        <StatsCard
          title="Estoque Baixo"
          value={dashboardStats.itens_estoque_baixo}
          icon={<AlertTriangle className="h-6 w-6" />}
          variant="warning"
          trend={{
            value: dashboardStats.novos_itens_baixo,
            label: "novos itens",
            positive: false,
          }}
        />
        <StatsCard
          title="Movimentações"
          value={dashboardStats.total_movimentacoes}
          icon={<ArrowRightLeft className="h-6 w-6" />}
          variant="primary"
          trend={{
            value: dashboardStats.variacao_movimentacoes,
            label: "vs mês anterior",
            positive: dashboardStats.variacao_movimentacoes > 0,
          }}
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Line Chart */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-card-foreground">
              Movimentações por Período
            </h2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  Últimos 30 dias
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Últimos 7 dias</DropdownMenuItem>
                <DropdownMenuItem>Últimos 30 dias</DropdownMenuItem>
                <DropdownMenuItem>Últimos 90 dias</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <MovimentacoesChart data={movimentacoesPeriodo} />
        </div>

        {/* Low Stock */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-card-foreground">
              Estoque Baixo
            </h2>
            <Button variant="link" size="sm" className="text-primary p-0 h-auto">
              Ver todos
            </Button>
          </div>
          <div className="space-y-4">
            {estoqueBaixo.map((item) => (
              <div
                key={item.id_item}
                className="flex items-center justify-between rounded-lg bg-muted/50 p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {item.nome}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.categoria}
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-destructive/10 px-2.5 py-1 text-xs font-semibold text-destructive">
                  {item.quantidade} un.
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Movements Table */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card">
          <div className="border-b border-border p-6">
            <h2 className="text-lg font-semibold text-card-foreground">
              Últimas Movimentações
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Data
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
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {ultimasMovimentacoes.map((mov) => (
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
                      {mov.usuario?.email?.split("@")[0].replace(".", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Pie Chart */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold text-card-foreground">
              Resumo por Escola
            </h2>
            <EscolasPieChart data={resumoEscolas} totalEscolas={12} />
            <div className="mt-4 space-y-2">
              {resumoEscolas.map((escola) => (
                <div
                  key={escola.id_escola}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: escola.cor }}
                    />
                    <span className="text-muted-foreground">{escola.nome}</span>
                  </div>
                  <span className="font-medium text-foreground">
                    R$ {escola.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold text-card-foreground">
              Categorias em Destaque
            </h2>
            <CategoriasBar data={categoriasDestaque} />
          </div>
        </div>
      </div>
    </div>
  )
}
