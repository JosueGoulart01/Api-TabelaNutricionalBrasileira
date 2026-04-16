'use client'

import { useState, useEffect } from 'react'
import { Database, Search, Utensils, Zap, Scale, Code2, BarChart3 } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { ApiStatus } from '@/components/api/api-status'
import { ApiTester } from '@/components/api/api-tester'
import { SearchSection } from '@/components/search/search-section'
import { StatsCard } from '@/components/stats/stats-card'
import { FoodComparator } from '@/components/compare/food-comparator'
import { CodeExamples } from '@/components/docs/code-examples'
import { NutrientChart } from '@/components/charts/nutrient-chart'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getAllAlimentos } from '@/lib/api'

export default function Home() {
  const [stats, setStats] = useState({
    totalAlimentos: 0,
    isLoading: true,
  })

  useEffect(() => {
    async function loadStats() {
      const response = await getAllAlimentos()
      if (response.data) {
        let count = 0
        if (Array.isArray(response.data)) {
          count = response.data.length
        } else if (typeof response.data === 'object' && 'content' in (response.data as object)) {
          const paginatedData = response.data as { content: unknown[], totalElements?: number }
          count = paginatedData.totalElements || paginatedData.content.length
        }
        setStats({
          totalAlimentos: count,
          isLoading: false,
        })
      } else {
        setStats({
          totalAlimentos: 0,
          isLoading: false,
        })
      }
    }
    loadStats()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <Zap className="h-4 w-4" />
            API REST Gratuita
          </div>
          <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Tabela Nutricional
            <span className="block text-primary">Brasileira</span>
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
            Explore, teste e integre a API de informacoes nutricionais de alimentos brasileiros. 
            Dados de calorias, proteinas, carboidratos, minerais e muito mais.
          </p>
        </section>

        {/* API Status */}
        <section className="mb-8">
          <ApiStatus />
        </section>

        {/* Stats Grid */}
        <section className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total de Alimentos"
            value={stats.isLoading ? '...' : stats.totalAlimentos}
            description="Disponiveis na base"
            icon={Utensils}
          />
          <StatsCard
            title="Endpoints"
            value={5}
            description="REST APIs disponiveis"
            icon={Database}
          />
          <StatsCard
            title="Nutrientes"
            value={11}
            description="Por alimento"
            icon={Zap}
          />
          <StatsCard
            title="Busca"
            value="Tempo Real"
            description="Com autocomplete"
            icon={Search}
          />
        </section>

        {/* Main Content Tabs */}
        <Tabs defaultValue="explorer" className="space-y-6">
          <TabsList className="w-full flex-wrap h-auto gap-1 p-1 sm:w-auto sm:inline-flex">
            <TabsTrigger value="explorer" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Database className="h-4 w-4" />
              <span className="hidden sm:inline">Explorador</span>
              <span className="sm:hidden">API</span>
            </TabsTrigger>
            <TabsTrigger value="search" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Search className="h-4 w-4" />
              Buscar
            </TabsTrigger>
            <TabsTrigger value="compare" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Scale className="h-4 w-4" />
              Comparar
            </TabsTrigger>
            <TabsTrigger value="charts" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Graficos</span>
              <span className="sm:hidden">Vis.</span>
            </TabsTrigger>
            <TabsTrigger value="code" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Code2 className="h-4 w-4" />
              <span className="hidden sm:inline">Codigo</span>
              <span className="sm:hidden">Dev</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="explorer" className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-foreground">
                  Explorador de Endpoints
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Clique em um endpoint para expandir, preencha os parametros e execute. 
                  Cada requisicao mostra status HTTP, tempo de resposta e o JSON retornado.
                </p>
              </div>
              <ApiTester />
            </div>
          </TabsContent>

          <TabsContent value="search" className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-foreground">
                  Buscar Alimentos
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Pesquise alimentos por nome e visualize suas informacoes nutricionais detalhadas com cards interativos.
                </p>
              </div>
              <SearchSection />
            </div>
          </TabsContent>

          <TabsContent value="compare" className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-foreground">
                  Comparar Alimentos
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Adicione ate 4 alimentos para comparar seus valores nutricionais lado a lado com graficos de barras.
                </p>
              </div>
              <FoodComparator />
            </div>
          </TabsContent>

          <TabsContent value="charts" className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-foreground">
                  Visualizacao Nutricional
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Visualize os nutrientes de um alimento em graficos de barras coloridos e intuitivos.
                </p>
              </div>
              <NutrientChart />
            </div>
          </TabsContent>

          <TabsContent value="code" className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-foreground">
                  Exemplos de Integracao
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Copie exemplos de codigo prontos para integrar a API em seu projeto favorito.
                </p>
              </div>
              <CodeExamples />
            </div>
          </TabsContent>
        </Tabs>

        {/* API Info Section */}
        <section className="mt-12 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold mb-3">Sobre a API</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                A API da Tabela Nutricional Brasileira fornece acesso gratuito a dados nutricionais 
                de centenas de alimentos. Os dados incluem macronutrientes (calorias, proteinas, 
                carboidratos, lipideos) e minerais (calcio, ferro, sodio, potassio, etc).
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Base URL</h3>
              <code className="block bg-sidebar text-sidebar-foreground rounded-lg p-4 text-sm font-mono overflow-x-auto">
                https://tabelanutricionalbrasileira.onrender.com
              </code>
              <p className="text-xs text-muted-foreground mt-2">
                API hospedada no Render. Primeira requisicao pode demorar alguns segundos.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Desenvolvido para testar e demonstrar a{' '}
            <a
              href="https://tabelanutricionalbrasileira.onrender.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium underline-offset-4 hover:underline"
            >
              API Tabela Nutricional Brasileira
            </a>
          </p>
        </footer>
      </main>
    </div>
  )
}
