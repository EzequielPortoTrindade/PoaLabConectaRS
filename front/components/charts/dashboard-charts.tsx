"use client"

import * as React from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { cn } from "@/lib/utils"

interface MovimentacoesChartProps {
  data: Array<{
    data: string
    entradas: number
    saidas: number
  }>
}

export function MovimentacoesChart({ data }: MovimentacoesChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis
          dataKey="data"
          tick={{ fontSize: 12 }}
          className="text-muted-foreground"
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          tick={{ fontSize: 12 }}
          className="text-muted-foreground"
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          }}
          labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
        />
        <Legend
          wrapperStyle={{ paddingTop: "20px" }}
          formatter={(value) => (
            <span className="text-sm text-muted-foreground">{value}</span>
          )}
        />
        <Line
          type="monotone"
          dataKey="entradas"
          name="Entradas"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
        />
        <Line
          type="monotone"
          dataKey="saidas"
          name="Saídas"
          stroke="hsl(var(--success))"
          strokeWidth={2}
          dot={{ fill: "hsl(var(--success))", strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, fill: "hsl(var(--success))" }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

interface EscolasPieChartProps {
  data: Array<{
    nome: string
    valor: number
    cor: string
  }>
  totalEscolas: number
}

export function EscolasPieChart({ data, totalEscolas }: EscolasPieChartProps) {
  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={2}
            dataKey="valor"
            nameKey="nome"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.cor} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
            formatter={(value: number) => [
              `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
              "Valor",
            ]}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="text-2xl font-bold text-foreground">{totalEscolas}</p>
        <p className="text-xs text-muted-foreground">Escolas</p>
      </div>
    </div>
  )
}

interface CategoriasBarProps {
  data: Array<{
    nome: string
    valor: number
    porcentagem: number
  }>
}

const barColors = [
  "bg-destructive",
  "bg-success",
  "bg-primary",
  "bg-warning",
]

export function CategoriasBar({ data }: CategoriasBarProps) {
  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <div key={item.nome} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "h-3 w-3 rounded-sm",
                  barColors[index % barColors.length]
                )}
              />
              <span className="text-sm font-medium text-foreground">
                {item.nome}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">
                R$ {item.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </span>
              <span className="text-xs text-muted-foreground">
                {item.porcentagem}%
              </span>
            </div>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={cn(
                "h-full rounded-full transition-all",
                barColors[index % barColors.length]
              )}
              style={{ width: `${item.porcentagem}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
