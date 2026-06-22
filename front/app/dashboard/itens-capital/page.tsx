"use client"

import * as React from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import type { SubmitEvent } from "react"

import {
  Plus,
  Search,
  MoreHorizontal,
  Trash2,
} from "lucide-react"

import { api } from "@/lib/api"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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

import type { Escola } from "../../../../shared/school.interface"
import type { Fornecedor } from "../../../../shared/supplier.interface"
import type { Item_Capital, ItemCapitalCreate } from "../../../../shared/capital.interface"

export default function ItensCapitalPage() {
  const queryClient = useQueryClient()

  const [searchTerm, setSearchTerm] = React.useState("")
  const [openDialog, setOpenDialog] = React.useState(false)

  // FORM 
  const [formData, setFormData] = React.useState<ItemCapitalCreate>({
    nome: "",
    descricao: "",
    num_patrimonio: "",
    id_escola: 0,
    id_fornecedor: 0,
  })

  // GET
  const { data: itens = [] } = useQuery<Item_Capital[]>({
    queryKey: ["itens-capital"],
    queryFn: () => api("/itens-capital"),
  })

  const { data: escolas = [] } = useQuery<Escola[]>({
    queryKey: ["escolas"],
    queryFn: () => api("/escolas"),
  })

  const { data: fornecedores = [] } = useQuery<Fornecedor[]>({
    queryKey: ["fornecedores"],
    queryFn: () => api("/fornecedores"),
  })

  // CREATE
  const createMutation = useMutation({
    mutationFn: (data: ItemCapitalCreate) =>
      api("/itens-capital", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          id_escola: Number(data.id_escola),
          id_fornecedor: Number(data.id_fornecedor),
        }),
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["itens-capital"] })

      setOpenDialog(false)

      setFormData({
        nome: "",
        descricao: "",
        num_patrimonio: "",
        id_escola: 0,
        id_fornecedor: 0,
      })
    },
  })

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      api(`/itens-capital/${id}`, {
        method: "DELETE",
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["itens-capital"] })
    },
  })

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    createMutation.mutate(formData)
  }

  const filteredItens = itens.filter((item) =>
    item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.num_patrimonio.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Itens de Capital</h1>
          <p className="text-muted-foreground">Controle de patrimônio</p>
        </div>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Item
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-lg">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Cadastro de Item</DialogTitle>
              </DialogHeader>

              <div className="grid gap-4 py-4">

                <Input
                  placeholder="Nome"
                  value={formData.nome}
                  onChange={(e) =>
                    setFormData({ ...formData, nome: e.target.value })
                  }
                />

                <Input
                  placeholder="Nº Patrimônio"
                  value={formData.num_patrimonio}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      num_patrimonio: e.target.value,
                    })
                  }
                />

                <Input
                  placeholder="Descrição"
                  value={formData.descricao ?? ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      descricao: e.target.value,
                    })
                  }
                />

                {/* ESCOLA */}
                <Select
                  value={formData.id_escola.toString()}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      id_escola: Number(value),
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Escola" />
                  </SelectTrigger>

                  <SelectContent>
                    {escolas.map((e) => (
                      <SelectItem
                        key={e.id_escola}
                        value={e.id_escola.toString()}
                      >
                        {e.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* FORNECEDOR */}
                <Select
                  value={formData.id_fornecedor.toString()}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      id_fornecedor: Number(value),
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Fornecedor" />
                  </SelectTrigger>

                  <SelectContent>
                    {fornecedores.map((f) => (
                      <SelectItem
                        key={f.id_fornecedor}
                        value={f.id_fornecedor.toString()}
                      >
                        {f.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter>
                <Button type="submit">Salvar</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* SEARCH */}
      <Input
        placeholder="Buscar itens..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* TABLE */}
      <Card>
        <CardHeader>
          <CardTitle>Itens de Capital</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patrimônio</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredItens.map((item) => (
                <TableRow key={item.id_itemCapital}>
                  <TableCell>{item.num_patrimonio}</TableCell>
                  <TableCell>{item.nome}</TableCell>
                  <TableCell>{item.descricao ?? "-"}</TableCell>

                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() =>
                            deleteMutation.mutate(item.id_itemCapital)
                          }
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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