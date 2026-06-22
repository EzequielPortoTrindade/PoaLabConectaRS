"use client"

import * as React from "react"
import {
  Plus,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
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
import { escolas, fornecedores, itensConsumo } from "@/lib/mock-data"

const consumoData = itensConsumo.map((item) => ({
  ...item,
  escola: escolas.find((escola) => escola.id_escola === item.id_escola) ?? null,
  fornecedor:
    fornecedores.find((forn) => forn.id_fornecedor === item.id_fornecedor) ?? null,
}))

export default function ItensConsumoPage() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false)
  const [nome, setNome] = React.useState("")
  const [descricao, setDescricao] = React.useState("")
  const [quantidade, setQuantidade] = React.useState("")
  const [escolaSelecionada, setEscolaSelecionada] = React.useState<string>("")
  const [fornecedorSelecionado, setFornecedorSelecionado] = React.useState<string>("")

  const filteredItens = consumoData.filter((item) => {
    const search = searchTerm.toLowerCase()
    return (
      item.nome.toLowerCase().includes(search) ||
      item.descricao?.toLowerCase().includes(search) ||
      item.escola?.nome.toLowerCase().includes(search) ||
      item.fornecedor?.nome.toLowerCase().includes(search)
    )
  })

  return (
    <div className="space-y-6">
      <PageHeader
        title="Itens de Consumo"
        description="Gerencie os itens de consumo e seus relacionamentos com escola e fornecedor"
      >
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Cadastrar Item de Consumo</DialogTitle>
              <DialogDescription>
                Preencha os dados para cadastrar um novo item de consumo.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: Papel A4, Lápis..."
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quantidade">Quantidade</Label>
                <Input
                  id="quantidade"
                  type="number"
                  value={quantidade}
                  onChange={(e) => setQuantidade(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Input
                  id="descricao"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Descrição do item"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="escola">Escola</Label>
                <Select
                  value={escolaSelecionada}
                  onValueChange={(value) => setEscolaSelecionada(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a escola" />
                  </SelectTrigger>
                  <SelectContent>
                    {escolas.map((escola) => (
                      <SelectItem
                        key={escola.id_escola}
                        value={escola.id_escola.toString()}
                      >
                        {escola.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fornecedor">Fornecedor</Label>
                <Select
                  value={fornecedorSelecionado}
                  onValueChange={(value) => setFornecedorSelecionado(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o fornecedor" />
                  </SelectTrigger>
                  <SelectContent>
                    {fornecedores.map((forn) => (
                      <SelectItem
                        key={forn.id_fornecedor}
                        value={forn.id_fornecedor.toString()}
                      >
                        {forn.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar itens..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Nome
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Quantidade
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Escola
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Fornecedor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Descrição
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredItens.map((item) => (
                <tr key={item.id_item_consumo} className="hover:bg-muted/30">
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-foreground">
                    {item.nome}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-muted-foreground">
                    {item.quantidade}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-muted-foreground">
                    {item.escola?.nome ?? "-"}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-muted-foreground">
                    {item.fornecedor?.nome ?? "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {item.descricao ?? "-"}
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
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-border bg-muted/30 px-6 py-3">
          <p className="text-sm text-muted-foreground">
            Mostrando <span className="font-medium">{filteredItens.length}</span> de <span className="font-medium">{consumoData.length}</span> itens
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
