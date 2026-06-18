import * as React from "react"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  description?: string
  children?: React.ReactNode
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {title}
        </h1>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  )
}

interface StatsCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  trend?: {
    value: number
    label: string
    positive?: boolean
  }
  variant?: "default" | "primary" | "success" | "warning" | "destructive"
}

export function StatsCard({
  title,
  value,
  icon,
  trend,
  variant = "default",
}: StatsCardProps) {
  const iconColors = {
    default: "bg-muted text-muted-foreground",
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    destructive: "bg-destructive/10 text-destructive",
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-card-foreground">{value}</p>
          {trend && (
            <p
              className={cn(
                "flex items-center gap-1 text-xs font-medium",
                trend.positive ? "text-success" : "text-destructive"
              )}
            >
              <span>
                {trend.positive ? "↑" : "↓"} {Math.abs(trend.value)}%
              </span>
              <span className="text-muted-foreground">{trend.label}</span>
            </p>
          )}
        </div>
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl",
            iconColors[variant]
          )}
        >
          {icon}
        </div>
      </div>
    </div>
  )
}

interface StatusBadgeProps {
  status:
    | "emprestimo"
    | "saida"
    | "ativo"
    | "inativo"
    | "baixo"
    | "normal"
    | "pending"
    | "approved"
    | "rejected"
  children: React.ReactNode
}

export function StatusBadge({ status, children }: StatusBadgeProps) {
  const statusStyles = {
    emprestimo: "bg-success/10 text-success border-success/20",
    saida: "bg-destructive/10 text-destructive border-destructive/20",
    ativo: "bg-success/10 text-success border-success/20",
    inativo: "bg-muted text-muted-foreground border-border",
    baixo: "bg-destructive/10 text-destructive border-destructive/20",
    normal: "bg-success/10 text-success border-success/20",
    pending: "bg-warning/10 text-warning border-warning/20",
    approved: "bg-success/10 text-success border-success/20",
    rejected: "bg-destructive/10 text-destructive border-destructive/20",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        statusStyles[status]
      )}
    >
      {children}
    </span>
  )
}

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center">
      {icon && (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
