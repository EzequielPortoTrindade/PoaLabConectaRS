"use client"

import * as React from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Eye, MapPin, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PageHeader } from "@/components/shared"
import { api } from "@/lib/api"

interface Escola {
  id_escola: number
  nome: string
  rua: string
  numero: number
  bairro: string
  id_localizacao: number
}

interface Localizacao {
  id_localizacao: number
  nome_cidade: string
  uf: string
}

export default function EscolasPage() {
  const queryClient = useQueryClient()
  const [searchTerm, setSearchTerm] = React.useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false)

  // Estados do Formulário
  const [formData, setFormData] = React.useState({
    nome: "", rua: "", numero: "", bairro: "", id_localizacao: ""
  })

  // 1. BUSCAR ESCOLAS DO BACKEND VIA TANSTACK QUERY
  const { data: escolas = [], isLoading: loadingEscolas } = useQuery<Escola[]>({
    queryKey: ["escolas"],
    queryFn: () => api("/escolas")
  })

  // 2. BUSCAR LOCALIZAÇÕES PARA O SELECT
  const { data: localizacoes = [] } = useQuery<Localizacao[]>({
    queryKey: ["localizacoes"],
    queryFn: () => api("/local")
  })

  // 3. FAZER O POST DE NOVA ESCOLA
  const createEscolaMutation = useMutation({
    mutationFn: (novaEscola: typeof formData) => api("/escolas", {
      method: "POST",
      body: JSON.stringify({
        ...novaEscola,
        numero: Number(novaEscola.numero),
        id_localizacao: Number(novaEscola.id_localizacao)
      })
    }),
    onSuccess: () => {
      // Avisa o React Query que a lista antiga mudou. Ele vai buscar no banco de novo automaticamente!
      queryClient.invalidateQueries({ queryKey: ["escolas"] })
      setIsCreateDialogOpen(false)
      setFormData({ nome: "", rua: "", numero: "", bairro: "", id_localizacao: "" })
    },
    onError: () => alert("Erro ao cadastrar escola.")
  })

  // 4. FAZER O DELETE DA ESCOLA
  const deleteEscolaMutation = useMutation({
    mutationFn: (id: number) => api(`/escolas/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["escolas"] })
    },
    onError: () => alert("Erro ao deletar escola.")
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createEscolaMutation.mutate(formData)
  }

  const filteredEscolas = escolas.filter((escola) =>
    escola.nome?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <PageHeader title="Escolas" description="Gerencie as escolas cadastradas no sistema">
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Nova Escola
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Cadastrar Escola</DialogTitle>
                <DialogDescription>Preencha os dados para cadastrar uma nova escola.</DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="nome">Nome da Escola</Label>
                  <Input id="nome" required value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} placeholder="Ex: Escola Municipal..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="rua">Rua</Label>
                    <Input id="rua" required value={formData.rua} onChange={e => setFormData({...formData, rua: e.target.value})} placeholder="Nome da rua" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="numero">Número</Label>
                    <Input id="numero" type="number" required value={formData.numero} onChange={e => setFormData({...formData, numero: e.target.value})} placeholder="Nº" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="bairro">Bairro</Label>
                    <Input id="bairro" required value={formData.bairro} onChange={e => setFormData({...formData, bairro: e.target.value})} placeholder="Bairro" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="localizacao">Localização</Label>
                    <Select value={formData.id_localizacao} onValueChange={value => setFormData({...formData, id_localizacao: value})}>
                      <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                      <SelectContent>
                        {localizacoes.map((loc) => (
                          <SelectItem key={loc.id_localizacao} value={loc.id_localizacao.toString()}>
                            {loc.nome_cidade} - {loc.uf}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancelar</Button>
                <Button type="submit" disabled={createEscolaMutation.isPending}>
                  {createEscolaMutation.isPending ? "Cadastrando..." : "Cadastrar"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </PageHeader>

      {/* Barra de Busca */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Buscar escolas..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9" />
        </div>
      </div>

      {/* Grid de Cards (Com Loading Tratado) */}
      {loadingEscolas ? (
        <p className="text-center text-muted-foreground py-12">Carregando escolas do servidor...</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEscolas.map((escola) => (
            <div key={escola.id_escola} className="group relative overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md">
              <div className="h-24 bg-gradient-to-br from-primary/80 to-primary relative">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="absolute right-2 top-2 h-8 w-8 text-white hover:bg-white/20">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem><Eye className="mr-2 h-4 w-4" /> Visualizar</DropdownMenuItem>
                    <DropdownMenuItem><Pencil className="mr-2 h-4 w-4" /> Editar</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="text-destructive"
                      onClick={() => {
                        if(confirm(`Deseja excluir a escola ${escola.nome}?`)) {
                          deleteEscolaMutation.mutate(escola.id_escola)
                        }
                      }}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="p-6 pt-0">
                <div className="-mt-8 mb-4 flex h-16 w-16 items-center justify-center rounded-xl border-4 border-card bg-background shadow-sm">
                  <Building className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground line-clamp-1">{escola.nome}</h3>
                <div className="mt-3 space-y-2">
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                    <span className="line-clamp-2">{escola.rua}, {escola.numero} - {escola.bairro}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loadingEscolas && filteredEscolas.length === 0 && (
        <p className="text-center text-muted-foreground py-12">Nenhuma escola encontrada.</p>
      )}
    </div>
  )
}

// "use client"

// import * as React from "react"
// import {
//   Plus,
//   Search,
//   MoreHorizontal,
//   Pencil,
//   Trash2,
//   Eye,
//   MapPin,
//   Building,
//   Users,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Label } from "@/components/ui/label"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { PageHeader } from "@/components/shared"
// import { escolas } from "@/lib/mock-data"

// const localizacoes = [
//   { id_localizacao: 1, nome_cidade: "Monte Azul", uf: "SP" },
//   { id_localizacao: 2, nome_cidade: "São João", uf: "SP" },
//   { id_localizacao: 3, nome_cidade: "Dom Pedro", uf: "SP" },
// ]

// export default function EscolasPage() {
//   const [searchTerm, setSearchTerm] = React.useState("")
//   const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false)

//   const filteredEscolas = escolas.filter((escola) =>
//     escola.nome.toLowerCase().includes(searchTerm.toLowerCase())
//   )

//   return (
//     <div className="space-y-6">
//       <PageHeader
//         title="Escolas"
//         description="Gerencie as escolas cadastradas no sistema"
//       >
//         <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
//           <DialogTrigger asChild>
//             <Button className="gap-2">
//               <Plus className="h-4 w-4" />
//               Nova Escola
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[500px]">
//             <DialogHeader>
//               <DialogTitle>Cadastrar Escola</DialogTitle>
//               <DialogDescription>
//                 Preencha os dados para cadastrar uma nova escola.
//               </DialogDescription>
//             </DialogHeader>
//             <div className="grid gap-4 py-4">
//               <div className="grid gap-2">
//                 <Label htmlFor="nome">Nome da Escola</Label>
//                 <Input id="nome" placeholder="Ex: Escola Municipal..." />
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="grid gap-2">
//                   <Label htmlFor="rua">Rua</Label>
//                   <Input id="rua" placeholder="Nome da rua" />
//                 </div>
//                 <div className="grid gap-2">
//                   <Label htmlFor="numero">Número</Label>
//                   <Input id="numero" type="number" placeholder="Nº" />
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="grid gap-2">
//                   <Label htmlFor="bairro">Bairro</Label>
//                   <Input id="bairro" placeholder="Bairro" />
//                 </div>
//                 <div className="grid gap-2">
//                   <Label htmlFor="localizacao">Localização</Label>
//                   <Select>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Selecione" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {localizacoes.map((loc) => (
//                         <SelectItem
//                           key={loc.id_localizacao}
//                           value={loc.id_localizacao.toString()}
//                         >
//                           {loc.nome_cidade} - {loc.uf}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//             </div>
//             <DialogFooter>
//               <Button
//                 variant="outline"
//                 onClick={() => setIsCreateDialogOpen(false)}
//               >
//                 Cancelar
//               </Button>
//               <Button onClick={() => setIsCreateDialogOpen(false)}>
//                 Cadastrar
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </PageHeader>

//       {/* Search */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div className="relative w-full sm:max-w-xs">
//           <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//           <Input
//             placeholder="Buscar escolas..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-9"
//           />
//         </div>
//       </div>

//       {/* Cards Grid */}
//       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {filteredEscolas.map((escola) => (
//           <div
//             key={escola.id_escola}
//             className="group relative overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md"
//           >
//             {/* Header with gradient */}
//             <div className="h-24 bg-gradient-to-br from-primary/80 to-primary relative">
//               <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className="absolute right-2 top-2 h-8 w-8 text-white hover:bg-white/20"
//                   >
//                     <MoreHorizontal className="h-4 w-4" />
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end">
//                   <DropdownMenuItem>
//                     <Eye className="mr-2 h-4 w-4" />
//                     Visualizar
//                   </DropdownMenuItem>
//                   <DropdownMenuItem>
//                     <Pencil className="mr-2 h-4 w-4" />
//                     Editar
//                   </DropdownMenuItem>
//                   <DropdownMenuSeparator />
//                   <DropdownMenuItem className="text-destructive">
//                     <Trash2 className="mr-2 h-4 w-4" />
//                     Excluir
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>

//             {/* Content */}
//             <div className="p-6 pt-0">
//               <div className="-mt-8 mb-4 flex h-16 w-16 items-center justify-center rounded-xl border-4 border-card bg-background shadow-sm">
//                 <Building className="h-8 w-8 text-primary" />
//               </div>
//               <h3 className="font-semibold text-foreground line-clamp-1">
//                 {escola.nome}
//               </h3>
//               <div className="mt-3 space-y-2">
//                 <div className="flex items-start gap-2 text-sm text-muted-foreground">
//                   <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
//                   <span className="line-clamp-2">
//                     {escola.rua}, {escola.numero} - {escola.bairro}
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                   <Users className="h-4 w-4" />
//                   <span>3 professores</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="flex items-center justify-between">
//         <p className="text-sm text-muted-foreground">
//           Mostrando <span className="font-medium">{filteredEscolas.length}</span> de{" "}
//           <span className="font-medium">{escolas.length}</span> escolas
//         </p>
//         <div className="flex items-center gap-2">
//           <Button variant="outline" size="sm" disabled>
//             Anterior
//           </Button>
//           <Button variant="outline" size="sm" disabled>
//             Próximo
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }
