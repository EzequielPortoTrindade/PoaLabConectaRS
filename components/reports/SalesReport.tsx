"use client";

import {
  ArrowRightLeft,
  TrendingUp,
  Package,
  School,
  FileText,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  movimentacoesMensais: any[];
  consumoPorCategoria: any[];
  distribuicaoEscolas: any[];
  relatoriosDisponiveis: any[];
};

const COLORS = [
  "#4F46E5",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
];

export function SalesReport({
  movimentacoesMensais,
  consumoPorCategoria,
  distribuicaoEscolas,
  relatoriosDisponiveis,
}: Props) {
  return (
    <div
      id="sales-report"
      className="space-y-6"
    >

      {/* CARDS SUPERIORES */}

      <div className="grid gap-4 md:grid-cols-4">

        <Card>

          <CardHeader className="flex flex-row items-center justify-between pb-2">

            <CardTitle className="text-sm font-medium text-muted-foreground">

              Total Movimentações

            </CardTitle>

            <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />

          </CardHeader>

          <CardContent>

            <div className="text-2xl font-bold">

              1.248

            </div>

            <p className="text-xs text-muted-foreground">

              <TrendingUp className="inline h-3 w-3 text-green-500" />

              {" "}+12% vs período anterior

            </p>

          </CardContent>

        </Card>

        <Card>

          <CardHeader className="flex flex-row items-center justify-between pb-2">

            <CardTitle className="text-sm font-medium text-muted-foreground">

              Valor em Estoque

            </CardTitle>

            <Package className="h-4 w-4 text-muted-foreground" />

          </CardHeader>

          <CardContent>

            <div className="text-2xl font-bold">

              R$ 245.678

            </div>

          </CardContent>

        </Card>

        <Card>

          <CardHeader className="flex flex-row items-center justify-between pb-2">

            <CardTitle className="text-sm font-medium text-muted-foreground">

              Escolas Atendidas

            </CardTitle>

            <School className="h-4 w-4 text-muted-foreground" />

          </CardHeader>

          <CardContent>

            <div className="text-2xl font-bold">

              12

            </div>

          </CardContent>

        </Card>

        <Card>

          <CardHeader className="flex flex-row items-center justify-between pb-2">

            <CardTitle className="text-sm font-medium text-muted-foreground">

              Economia Gerada

            </CardTitle>

            <TrendingUp className="h-4 w-4 text-green-500" />

          </CardHeader>

          <CardContent>

            <div className="text-2xl font-bold text-green-600">

              R$ 18.500

            </div>

          </CardContent>

        </Card>

      </div>

      {/* GRÁFICOS */}

      <div className="grid gap-4 lg:grid-cols-2">

        <Card>

          <CardHeader>

            <CardTitle>

              Movimentações por Mês

            </CardTitle>

          </CardHeader>

          <CardContent>

            <div className="h-[300px]">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <LineChart data={movimentacoesMensais}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="mes" />

                  <YAxis />

                  <Tooltip />

                  <Legend />

                  <Line
                    dataKey="entradas"
                    stroke="#10B981"
                  />

                  <Line
                    dataKey="saidas"
                    stroke="#EF4444"
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </CardContent>

        </Card>

        <Card>

          <CardHeader>

            <CardTitle>

              Consumo por Categoria

            </CardTitle>

          </CardHeader>

          <CardContent>

            <div className="h-[300px]">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart data={consumoPorCategoria}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="categoria" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="valor"
                    fill="#4F46E5"
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </CardContent>

        </Card>

      </div>

      {/* PIE + RELATÓRIOS */}

      <div className="grid gap-4 lg:grid-cols-3">

        <Card>

          <CardHeader>

            <CardTitle>

              Distribuição por Escola

            </CardTitle>

          </CardHeader>

          <CardContent>

            <div className="h-[250px]">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <PieChart>

                  <Pie
                    data={distribuicaoEscolas}
                    dataKey="value"
                  >

                    {distribuicaoEscolas.map((_, index) => (

                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                            COLORS.length
                          ]
                        }
                      />

                    ))}

                  </Pie>

                </PieChart>

              </ResponsiveContainer>

            </div>

          </CardContent>

        </Card>

        <Card className="lg:col-span-2">

          <CardHeader>

            <CardTitle>

              Relatórios Disponíveis

            </CardTitle>

          </CardHeader>

          <CardContent>

            <div className="grid gap-3 sm:grid-cols-2">

              {relatoriosDisponiveis.map(
                (relatorio) => (

                <div
                  key={relatorio.id}
                  className="rounded-lg border p-3"
                >

                  <div className="flex gap-3">

                    <FileText className="h-5 w-5" />

                    <div>

                      <p className="font-medium">

                        {relatorio.nome}

                      </p>

                      <p className="text-sm text-muted-foreground">

                        {relatorio.descricao}

                      </p>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </CardContent>

        </Card>

      </div>

    </div>
  );
}