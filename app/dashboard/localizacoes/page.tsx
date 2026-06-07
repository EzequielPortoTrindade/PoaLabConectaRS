"use client"

import * as React from "react"
import {
  MapPin,
  Plus,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  Building2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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

const localizacoes = [
  { id: 1, nome_cidade: "São Paulo", uf: "SP" },
  { id: 2, nome_cidade: "Rio de Janeiro", uf: "RJ" },
  { id: 3, nome_cidade: "Belo Horizonte", uf: "MG" },
  { id: 4, nome_cidade: "Salvador", uf: "BA" },
  { id: 5, nome_cidade: "Fortaleza", uf: "CE" },
  { id: 6, nome_cidade: "Manaus", uf: "AM" },
]

export default function LocalizacoesPage() {
  const [searchTerm, setSearchTerm] = React.useState("")

  const filteredLocalizacoes = localizacoes.filter(
    (loc) =>
      loc.nome_cidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.uf.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Localizações
          </h1>
          <p className="text-muted-foreground">
           Adicione uma nova cidade ao sistema.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Localização
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nova Localização</DialogTitle>
              <DialogDescription>
                Adicione um nova localização ao sistema.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="nome">Nome da Cidade</Label>
                <Input id="nome" placeholder="digite o nome da cidade" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="uf">UF</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a UF" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RO">RO</SelectItem>
                    <SelectItem value="AC">AC</SelectItem>
                    <SelectItem value="AM">AM</SelectItem>
                    <SelectItem value="RR">RR</SelectItem>
                    <SelectItem value="PA">PA</SelectItem>
                    <SelectItem value="AP">AP</SelectItem>
                    <SelectItem value="TO">TO</SelectItem>
                    <SelectItem value="MA">MA</SelectItem>
                    <SelectItem value="PI">PI</SelectItem>
                    <SelectItem value="CE">CE</SelectItem>
                    <SelectItem value="RN">RN</SelectItem>
                    <SelectItem value="PB">PB</SelectItem>
                    <SelectItem value="PE">PE</SelectItem>
                    <SelectItem value="AL">AL</SelectItem>
                    <SelectItem value="SE">SE</SelectItem>
                    <SelectItem value="BA">BA</SelectItem>
                    <SelectItem value="MG">MG</SelectItem>
                    <SelectItem value="ES">ES</SelectItem>
                    <SelectItem value="RJ">RJ</SelectItem>
                    <SelectItem value="SP">SP</SelectItem>
                    <SelectItem value="PR">PR</SelectItem>
                    <SelectItem value="SC">SC</SelectItem>
                    <SelectItem value="RS">RS</SelectItem>
                    <SelectItem value="MS">MS</SelectItem>
                    <SelectItem value="MT">MT</SelectItem>
                    <SelectItem value="GO">GO</SelectItem>
                    <SelectItem value="DF">DF</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Locais
            </CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{localizacoes.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Lista de Localizações</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar localização..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome da Cidade</TableHead>
                <TableHead>UF</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLocalizacoes.map((loc) => (
                <TableRow key={loc.id}>
                  <TableCell className="font-medium">{loc.nome_cidade}</TableCell>
                  <TableCell>{loc.uf}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
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
