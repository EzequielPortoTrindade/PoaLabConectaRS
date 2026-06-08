"use client"

import * as React from "react"
import {
  Settings,
  User,
  Building,
  Bell,
  Shield,
  Palette,
  Database,
  Mail,
  Save,
  Moon,
  Sun,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ConfiguracoesPage() {
  const [notificacoesEmail, setNotificacoesEmail] = React.useState(true)
  const [notificacoesPush, setNotificacoesPush] = React.useState(true)
  const [alertaEstoqueBaixo, setAlertaEstoqueBaixo] = React.useState(true)
  const [tema, setTema] = React.useState("sistema")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Configurações
        </h1>
        <p className="text-muted-foreground">
          Gerencie as configurações do sistema
        </p>
      </div>

      <Tabs defaultValue="perfil" className="space-y-4">
        <TabsList>
          <TabsTrigger value="perfil">
            <User className="mr-2 h-4 w-4" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="organizacao">
            <Building className="mr-2 h-4 w-4" />
            Organização
          </TabsTrigger>
          <TabsTrigger value="notificacoes">
            <Bell className="mr-2 h-4 w-4" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="aparencia">
            <Palette className="mr-2 h-4 w-4" />
            Aparência
          </TabsTrigger>
          <TabsTrigger value="seguranca">
            <Shield className="mr-2 h-4 w-4" />
            Segurança
          </TabsTrigger>
        </TabsList>

        <TabsContent value="perfil" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Perfil</CardTitle>
              <CardDescription>
                Atualize suas informações pessoais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/avatar.jpg" alt="Avatar" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                    AD
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    Alterar Foto
                  </Button>
                  <p className="mt-1 text-xs text-muted-foreground">
                    JPG, PNG ou GIF. Máximo 2MB.
                  </p>
                </div>
              </div>
              <Separator />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input id="nome" defaultValue="Administrador do Sistema" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" defaultValue="admin@edustock.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cargo">Cargo</Label>
                  <Input id="cargo" defaultValue="Administrador" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input id="telefone" defaultValue="(11) 99999-0000" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Alterações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="organizacao" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dados da Organização</CardTitle>
              <CardDescription>
                Configure as informações da secretaria de educação
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="org-nome">Nome da Organização</Label>
                  <Input id="org-nome" defaultValue="Secretaria Municipal de Educação" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="org-cnpj">CNPJ</Label>
                  <Input id="org-cnpj" defaultValue="00.000.000/0001-00" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="org-endereco">Endereço</Label>
                  <Input id="org-endereco" defaultValue="Rua Principal, 123" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="org-cidade">Cidade/UF</Label>
                  <Input id="org-cidade" defaultValue="São Paulo/SP" />
                </div>
              </div>
              <Separator />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="estoque-minimo">Alerta Estoque Mínimo (%)</Label>
                  <Input id="estoque-minimo" type="number" defaultValue="20" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dias-antecedencia">Dias Antecedência Pedidos</Label>
                  <Input id="dias-antecedencia" type="number" defaultValue="15" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Alterações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notificacoes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificações</CardTitle>
              <CardDescription>
                Configure como você deseja receber notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificações por E-mail</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba atualizações importantes por e-mail
                  </p>
                </div>
                <Switch
                  checked={notificacoesEmail}
                  onCheckedChange={setNotificacoesEmail}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificações Push</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba notificações em tempo real no navegador
                  </p>
                </div>
                <Switch
                  checked={notificacoesPush}
                  onCheckedChange={setNotificacoesPush}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Alertas de Estoque Baixo</Label>
                  <p className="text-sm text-muted-foreground">
                    Seja notificado quando itens atingirem o nível mínimo
                  </p>
                </div>
                <Switch
                  checked={alertaEstoqueBaixo}
                  onCheckedChange={setAlertaEstoqueBaixo}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="aparencia" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Aparência</CardTitle>
              <CardDescription>
                Personalize a aparência do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-2">
                <Label>Tema</Label>
                <Select value={tema} onValueChange={setTema}>
                  <SelectTrigger className="w-full sm:w-64">
                    <SelectValue placeholder="Selecione o tema" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="claro">
                      <div className="flex items-center">
                        <Sun className="mr-2 h-4 w-4" />
                        Claro
                      </div>
                    </SelectItem>
                    <SelectItem value="escuro">
                      <div className="flex items-center">
                        <Moon className="mr-2 h-4 w-4" />
                        Escuro
                      </div>
                    </SelectItem>
                    <SelectItem value="sistema">
                      <div className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        Sistema
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Escolha entre tema claro, escuro ou siga a preferência do sistema
                </p>
              </div>
              <Separator />
              <div className="grid gap-2">
                <Label>Idioma</Label>
                <Select defaultValue="pt-BR">
                  <SelectTrigger className="w-full sm:w-64">
                    <SelectValue placeholder="Selecione o idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                    <SelectItem value="en-US">English (US)</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seguranca" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Segurança da Conta</CardTitle>
              <CardDescription>
                Gerencie a segurança da sua conta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="senha-atual">Senha Atual</Label>
                  <Input id="senha-atual" type="password" />
                </div>
                <div></div>
                <div className="grid gap-2">
                  <Label htmlFor="nova-senha">Nova Senha</Label>
                  <Input id="nova-senha" type="password" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirmar-senha">Confirmar Nova Senha</Label>
                  <Input id="confirmar-senha" type="password" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button>
                  <Shield className="mr-2 h-4 w-4" />
                  Alterar Senha
                </Button>
              </div>
              <Separator />
              <div>
                <h4 className="text-sm font-medium">Sessões Ativas</h4>
                <p className="text-sm text-muted-foreground">
                  Você está conectado em 1 dispositivo
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Encerrar Todas as Sessões
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Backup de Dados</CardTitle>
              <CardDescription>
                Configure backups automáticos do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Backup Automático</Label>
                  <p className="text-sm text-muted-foreground">
                    Realiza backup diário às 03:00
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Database className="mr-2 h-4 w-4" />
                  Backup Manual
                </Button>
                <Button variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  Enviar por E-mail
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
