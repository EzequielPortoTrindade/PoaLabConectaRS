"use client"

import * as React from "react"
import {
  Plus,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  MapPin,
  Building,
  Users,
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
import { PageHeader } from "@/components/shared"
import { escolas, localizacao } from "@/lib/mock-data"


export default function EscolasPage() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false)
  const [isViewOpen, setIsViewOpen] = React.useState(false)
  const [escolaSelecionada, setEscolaSelecionada] = React.useState<any>(null)
  
  const visualizarEscola = (escola: any) => {
    setEscolaSelecionada(escola)
    setIsViewOpen(true)
  }

  const editarEscola = (escola: any) => {
    console.log("Editar:", escola)
  }

 const excluirEscola = (escola: any) => {
  alert(`Excluindo ${escola.nome}`)
  console.log("Excluir:", escola)
}

  const filteredEscolas = escolas.filter((escola) =>
    escola.nome.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title="Escolas"
        description="Gerencie as escolas cadastradas no sistema">
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nova Escola
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Cadastrar Escola</DialogTitle>
              <DialogDescription>
                Preencha os dados para cadastrar uma nova escola.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="nome">Nome da Escola</Label>
                <Input id="nome" placeholder="Ex: Escola Municipal..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="rua">Rua</Label>
                  <Input id="rua" placeholder="Nome da rua" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="numero">Número</Label>
                  <Input id="numero" type="number" placeholder="Nº" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="bairro">Bairro</Label>
                  <Input id="bairro" placeholder="Bairro" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="localizacao">Localização</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {localizacao.map((loc) => (
                        <SelectItem
                          key={loc.id_localizacao}
                          value={loc.id_localizacao.toString()}
                        >
                          {loc.nome_cidade} - {loc.uf}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button onClick={() => setIsCreateDialogOpen(false)}>
                Cadastrar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PageHeader>

      {/* Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar escolas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredEscolas.map((escola) => {
          const cidade = localizacao.find(
            (loc) => loc.id_localizacao === escola.id_localizacao
          )

          return (
            <div
              key={escola.id_escola}
              className="group relative overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md"
            >
              {/* Header with gradient */}
              <div className="h-24 bg-gradient-to-br from-primary/80 to-primary relative">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 h-8 w-8 text-white hover:bg-white/20"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={() => visualizarEscola(escola)}>
                      <Eye className="mr-2 h-4 w-4" />
                      Visualizar
                    </DropdownMenuItem>

                    <DropdownMenuItem onSelect={() => editarEscola(escola)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem className="text-destructive focus:text-destructive" 
                      onSelect={() => excluirEscola(escola)}
                      >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Content */}
              <div className="p-6 pt-0">
                <div className="-mt-8 mb-4 flex h-16 w-16 items-center justify-center rounded-xl border-4 border-card bg-background shadow-sm">
                  <Building className="h-8 w-8 text-primary" />
                </div>

                <h3 className="font-semibold text-foreground line-clamp-1">
                  {escola.nome}
                </h3>

                <div className="mt-3 space-y-2">
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mt-0.5 shrink-0" />

                    <span className="line-clamp-2">
                      {escola.rua}, {escola.numero} - {escola.bairro}
                    </span>
                  </div>

                  {/* Cidade da localização */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {cidade?.nome_cidade} - {cidade?.uf}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>3 professores</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

       {/* Dialog de Visualização */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {escolaSelecionada?.nome}
            </DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <p>Rua: {escolaSelecionada?.rua}</p>
          <p>Número: {escolaSelecionada?.numero}</p>
          <p>Bairro: {escolaSelecionada?.bairro}</p>
        </div>
      </DialogContent>
    </Dialog>

  </div>
  )
} 