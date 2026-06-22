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
import type { Item_Consumo } from "../../../../shared/consumo.interface"

type FormData = {
  quantidade: string
  nome: string
  emprestimo: string
  descricao: string
  id_escola: string
  id_fornecedor: string
}

export default function ItensConsumoPage() {
  const queryClient = useQueryClient()

  const [searchTerm, setSearchTerm] = React.useState("")
  const [openDialog, setOpenDialog] = React.useState(false)

  const [formData, setFormData] = React.useState<FormData>({
    quantidade: "",
    nome: "",
    emprestimo: "disponivel",
    descricao: "",
    id_escola: "",
    id_fornecedor: "",
  })

  // GET
  const { data: itens = [] } = useQuery<Item_Consumo[]>({
    queryKey: ["itens-consumo"],
    queryFn: () => api("/itens-consumo"),
  })

  const { data: escolas = [] } = useQuery<Escola[]>({
    queryKey: ["escolas"],
    queryFn: () => api("/escolas"),
  })

  const { data: fornecedores = [] } =
    useQuery<Fornecedor[]>({
      queryKey: ["fornecedores"],
      queryFn: () => api("/fornecedores"),
    })

  // CREATE
  const createMutation = useMutation({
    mutationFn: (data: FormData) =>
      api("/itens-consumo", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          quantidade: Number(data.quantidade),
          id_escola: Number(data.id_escola),
          id_fornecedor: Number(data.id_fornecedor),
        }),
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["itens-consumo"],
      })

      setOpenDialog(false)
    },
  })

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      api(`/itens-consumo/${id}`, {
        method: "DELETE",
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["itens-consumo"],
      })
    },
  })

  // UPDATE EMPRESTIMO
  const updateEmprestimoMutation = useMutation({
    mutationFn: ({
      id,
      emprestimo,
    }: {
      id: number
      emprestimo: string
    }) =>
      api(`/itens-consumo/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ emprestimo }),
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["itens-consumo"],
      })
    },
  })

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    createMutation.mutate(formData)
  }

  const filteredItens = itens.filter((item) =>
    item.nome.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Itens de Consumo
        </h1>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Item
            </Button>
          </DialogTrigger>

          <DialogContent>
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Novo Item</DialogTitle>
              </DialogHeader>

              <div className="grid gap-4 py-4">

                <Input
                  placeholder="Nome"
                  value={formData.nome}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      nome: e.target.value,
                    })
                  }
                />

                <Input
                  type="number"
                  placeholder="Quantidade"
                  value={formData.quantidade}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      quantidade: e.target.value,
                    })
                  }
                />

                <Input
                  placeholder="Descrição"
                  value={formData.descricao}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      descricao: e.target.value,
                    })
                  }
                />

                {/* EMPRESTIMO */}
                <Select
                  value={formData.emprestimo}
                  onValueChange={(v) =>
                    setFormData({
                      ...formData,
                      emprestimo: v,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Empréstimo" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="disponivel">
                      Disponível
                    </SelectItem>
                    <SelectItem value="emprestado">
                      Emprestado
                    </SelectItem>
                  </SelectContent>
                </Select>

                {/* ESCOLA */}
                <Select
                  value={formData.id_escola}
                  onValueChange={(v) =>
                    setFormData({
                      ...formData,
                      id_escola: v,
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
                  value={formData.id_fornecedor}
                  onValueChange={(v) =>
                    setFormData({
                      ...formData,
                      id_fornecedor: v,
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
                <Button type="submit">
                  Salvar
                </Button>
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
          <CardTitle>Lista</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Qtd</TableHead>
                <TableHead>Empréstimo</TableHead>
                <TableHead>Escola</TableHead>
                <TableHead>Fornecedor</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredItens.map((item) => (
                <TableRow key={item.id_itemConsumo}>

                  <TableCell>{item.nome}</TableCell>

                  <TableCell>{item.quantidade}</TableCell>

                  {/* EMPRESTIMO INLINE EDIT */}
                  <TableCell>
                    <Select
                      value={item.emprestimo ?? "disponivel"}
                      onValueChange={(value) =>
                        updateEmprestimoMutation.mutate({
                          id: item.id_itemConsumo,
                          emprestimo: value,
                        })
                      }
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="disponivel">
                          Disponível
                        </SelectItem>
                        <SelectItem value="emprestado">
                          Emprestado
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>

                  <TableCell>
                    {item.escola?.nome ?? "-"}
                  </TableCell>

                  <TableCell>
                    {item.fornecedor?.nome ?? "-"}
                  </TableCell>

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
                            deleteMutation.mutate(
                              item.id_itemConsumo
                            )
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