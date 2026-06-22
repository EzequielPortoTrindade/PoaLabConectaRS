"use client"

import * as React from "react"
import type { SubmitEvent } from "react"

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"

import {
  Truck,
  Plus,
  Search,
  MoreHorizontal,
  Trash2,
  Mail,
  Building,
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

import type { Fornecedor } from "../../../../shared/supplier.interface"
import type { Localizacao } from "../../../../shared/local.interface"

type FornecedorFormData = {
  nome: string
  cnpj: string
  telefone: string
  email: string
  website: string
  id_localizacao: string
}

export default function FornecedoresPage() {
  const queryClient = useQueryClient()
  
  const [searchTerm, setSearchTerm] = React.useState("")
  const [openDialog, setOpenDialog] = React.useState(false)

  const [formData, setFormData] =
    React.useState<FornecedorFormData>({
      nome: "",
      cnpj: "",
      telefone: "",
      email: "",
      website: "",
      id_localizacao: "",
    })

  // FORNECEDORES
  const {
    data: fornecedores = [],
    isLoading,
  } = useQuery<Fornecedor[]>({
    queryKey: ["fornecedores"],
    queryFn: () => api("/fornecedores"),
  })
  
  // LOCALIZAÇÕES
  const {
    data: localizacoes = [],
  } = useQuery<Localizacao[]>({
    queryKey: ["localizacoes"],
    queryFn: () => api("/local"),
  })

  // CRIAR
  const createFornecedorMutation = useMutation({
    mutationFn: (novoFornecedor: FornecedorFormData) =>
      api("/fornecedores", {
        method: "POST",
        body: JSON.stringify({
          ...novoFornecedor,
          id_localizacao: Number(
            novoFornecedor.id_localizacao
          ),
        }),
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fornecedores"],
      })

      setOpenDialog(false)

      setFormData({
        nome: "",
        cnpj: "",
        telefone: "",
        email: "",
        website: "",
        id_localizacao: "",
      })
    },

    onError: () => {
      alert("Erro ao cadastrar fornecedor")
    },
  })

  // DELETAR
  const deleteFornecedorMutation = useMutation({
    mutationFn: (id: number) =>
      api(`/fornecedores/${id}`, {
        method: "DELETE",
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fornecedores"],
      })
    },

    onError: () => {
      alert("Erro ao excluir fornecedor")
    },
  })

  const handleSubmit = (
    e: SubmitEvent<HTMLFormElement>
  ) => {
    e.preventDefault()
    createFornecedorMutation.mutate(formData)
  }

  const filteredFornecedores = fornecedores.filter(
    (fornecedor) =>
      fornecedor.nome
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      fornecedor.cnpj.includes(searchTerm)
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Fornecedores
          </h1>

          <p className="text-muted-foreground">
            Gerencie os fornecedores cadastrados
          </p>
        </div>

        <Dialog
          open={openDialog}
          onOpenChange={setOpenDialog}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Fornecedor
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-lg">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>
                  Novo Fornecedor
                </DialogTitle>

                <DialogDescription>
                  Cadastre um novo fornecedor.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="nome">
                    Nome
                  </Label>

                  <Input
                    id="nome"
                    required
                    value={formData.nome}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        nome: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="cnpj">
                    CNPJ
                  </Label>

                  <Input
                    id="cnpj"
                    required
                    value={formData.cnpj}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cnpj: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="telefone">
                    Telefone
                  </Label>

                  <Input
                    id="telefone"
                    required
                    value={formData.telefone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        telefone: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">
                    E-mail
                  </Label>

                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="website">
                    Website
                  </Label>

                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        website: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label>
                    Localização
                  </Label>

                  <Select
                    value={formData.id_localizacao}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        id_localizacao: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma localização" />
                    </SelectTrigger>

                    <SelectContent>
                      {localizacoes.map((loc) => (
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

              <DialogFooter>
                <Button
                  type="submit"
                  disabled={
                    createFornecedorMutation.isPending
                  }
                >
                  {createFornecedorMutation.isPending
                    ? "Salvando..."
                    : "Salvar"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">
              Total de Fornecedores
            </CardTitle>

            <Truck className="h-4 w-4" />
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">
              {fornecedores.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">
              Fornecedores Encontrados
            </CardTitle>

            <Building className="h-4 w-4" />
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">
              {filteredFornecedores.length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

            <Input
              placeholder="Buscar fornecedor..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />
          </div>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <p className="text-center py-4">
              Carregando...
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>CNPJ</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Localização</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredFornecedores.map(
                  (fornecedor) => (
                    <TableRow
                      key={
                        fornecedor.id_fornecedor
                      }
                    >
                      <TableCell>
                        {fornecedor.nome}
                      </TableCell>

                      <TableCell>
                        {fornecedor.cnpj}
                      </TableCell>

                      <TableCell>
                        {fornecedor.telefone}
                      </TableCell>

                      <TableCell>
                        {fornecedor.email}
                      </TableCell>

                      <TableCell>
                        {fornecedor.localizacao
                          ? `${fornecedor.localizacao.nome_cidade} - ${fornecedor.localizacao.uf}`
                          : "-"}
                      </TableCell>

                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Enviar E-mail
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() =>
                                deleteFornecedorMutation.mutate(
                                  fornecedor.id_fornecedor
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
                  )
                )}

                {filteredFornecedores.length ===
                  0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center"
                    >
                      Nenhum fornecedor encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}