"use client"

import * as React from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import type { SubmitEvent } from "react"

import {
  MapPin,
  Plus,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react"

import { api } from "@/lib/api"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
import { Localizacao } from "../../../../shared/local.interface"

export default function LocalizacoesPage() {
  const queryClient = useQueryClient()

  const [searchTerm, setSearchTerm] = React.useState("")
  const [openDialog, setOpenDialog] = React.useState(false)

  const [formData, setFormData] = React.useState({
    nome_cidade: "",
    uf: "",
  })

  const { data: localizacoes = [], isLoading } = useQuery<Localizacao[]>({
    queryKey: ["localizacoes"],
    queryFn: () => api("/local"),
  })

  const createLocalizacaoMutation = useMutation({
    mutationFn: (novaLocalizacao: typeof formData) =>
      api("/local", {
        method: "POST",
        body: JSON.stringify(novaLocalizacao),
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["localizacoes"],
      })

      setOpenDialog(false)

      setFormData({
        nome_cidade: "",
        uf: "",
      })
    },
  })

  const deleteLocalizacaoMutation = useMutation({
    mutationFn: (id: number) =>
      api(`/local/${id}`, {
        method: "DELETE",
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["localizacoes"],
      })
    },
  })

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    createLocalizacaoMutation.mutate(formData)
  }

  const filteredLocalizacoes = localizacoes.filter(
    (loc) =>
      loc.nome_cidade
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      loc.uf.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">

      {/* restante da página */}

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nova Localização
          </Button>
        </DialogTrigger>

        <DialogContent>
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Nova Localização</DialogTitle>
              <DialogDescription>
                Adicione uma nova localização.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">

              <div className="grid gap-2">
                <Label>Nome da Cidade</Label>

                <Input
                  value={formData.nome_cidade}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      nome_cidade: e.target.value,
                    })
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label>UF</Label>

                <Select
                  value={formData.uf}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      uf: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a UF" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="RS">RS</SelectItem>
                    <SelectItem value="SC">SC</SelectItem>
                    <SelectItem value="PR">PR</SelectItem>
                    <SelectItem value="SP">SP</SelectItem>
                    <SelectItem value="RJ">RJ</SelectItem>

                    {/* demais estados */}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="submit"
                disabled={createLocalizacaoMutation.isPending}
              >
                {createLocalizacaoMutation.isPending
                  ? "Salvando..."
                  : "Salvar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Card>
        <CardContent>
          {isLoading ? (
            <p>Carregando...</p>
          ) : (
            <Table>
              <TableBody>
                {filteredLocalizacoes.map((loc) => (
                  <TableRow key={loc.id_localizacao}>
                    <TableCell>
                      {loc.nome_cidade}
                    </TableCell>

                    <TableCell>
                      {loc.uf}
                    </TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                          >
                            <MoreHorizontal />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() =>
                              deleteLocalizacaoMutation.mutate(
                                loc.id_localizacao
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
          )}
        </CardContent>
      </Card>
    </div>
  )
}