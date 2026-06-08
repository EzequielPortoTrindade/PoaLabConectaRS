"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  MapPin,
  School,
  Truck,
  Package,
  Boxes,
  ShoppingCart,
  ClipboardList,
  ArrowRightLeft,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface NavItem {
  title: string
  href: string
  icon: React.ElementType
  badge?: number
}

const mainNavItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Usuários", href: "/dashboard/usuarios", icon: Users },
  { title: "Professores", href: "/dashboard/professores", icon: GraduationCap },
  { title: "Localizações", href: "/dashboard/localizacoes", icon: MapPin },
  { title: "Escolas", href: "/dashboard/escolas", icon: School },
  { title: "Fornecedores", href: "/dashboard/fornecedores", icon: Truck },
  { title: "Itens de Consumo", href: "/dashboard/itens-consumo", icon: Package },
  { title: "Itens de Capital", href: "/dashboard/itens-capital", icon: Boxes },
  { title: "Compras", href: "/dashboard/compras", icon: ShoppingCart },
  { title: "Controle de Estoque", href: "/dashboard/estoque", icon: ClipboardList },
  { title: "Logs de Saída", href: "/dashboard/logs-saida", icon: ArrowRightLeft },
  { title: "Movimentações", href: "/dashboard/movimentacoes", icon: ArrowRightLeft },
]

const secondaryNavItems: NavItem[] = [
  { title: "Relatórios", href: "/dashboard/relatorios", icon: BarChart3 },
  { title: "Configurações", href: "/dashboard/configuracoes", icon: Settings },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen border-r border-sidebar-border bg-sidebar transition-all duration-300",
          collapsed ? "w-[70px]" : "w-[260px]"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Package className="h-5 w-5" />
              </div>
              {!collapsed && (
                <span className="text-lg font-bold text-sidebar-foreground">
                  EduStock
                </span>
              )}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent"
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 overflow-y-auto p-2">
            {mainNavItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return collapsed ? (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex h-10 w-full items-center justify-center rounded-lg transition-colors",
                        isActive
                          ? "bg-sidebar-primary text-sidebar-primary-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={10}>
                    {item.title}
                  </TooltipContent>
                </Tooltip>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex h-10 w-full items-center gap-3 rounded-lg px-3 transition-colors",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  <span className="truncate text-sm font-medium">{item.title}</span>
                  {item.badge && (
                    <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1.5 text-xs font-medium text-destructive-foreground">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}

            <div className="my-4 border-t border-sidebar-border" />

            {secondaryNavItems.map((item) => {
              const isActive = pathname === item.href
              return collapsed ? (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex h-10 w-full items-center justify-center rounded-lg transition-colors",
                        isActive
                          ? "bg-sidebar-primary text-sidebar-primary-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={10}>
                    {item.title}
                  </TooltipContent>
                </Tooltip>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex h-10 w-full items-center gap-3 rounded-lg px-3 transition-colors",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  <span className="truncate text-sm font-medium">{item.title}</span>
                </Link>
              )
            })}
          </nav>

          {/* User Section */}
          <div className="border-t border-sidebar-border p-2">
            {collapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="flex h-10 w-full items-center justify-center rounded-lg text-sidebar-foreground hover:bg-sidebar-accent">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatar.jpg" alt="Usuário" />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        EM
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={10}>
                  <div>
                    <p className="font-medium">Escola Municipal Monte Azul</p>
                    <p className="text-xs text-muted-foreground">Administrador</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            ) : (
              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sidebar-foreground hover:bg-sidebar-accent">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatar.jpg" alt="Usuário" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    EM
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 truncate">
                  <p className="truncate text-sm font-medium">
                    Escola Municipal Monte Azul
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    Administrador
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>
      </aside>
    </TooltipProvider>
  )
}
