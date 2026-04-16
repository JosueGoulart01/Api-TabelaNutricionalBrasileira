'use client'

import { useState, useEffect } from 'react'
import { Search, BarChart3, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { searchAlimentos, getAlimentoById } from '@/lib/api'
import type { Alimento } from '@/types/alimento'
import { cn } from '@/lib/utils'

const NUTRIENT_INFO: Record<string, { color: string; bgColor: string; max: number }> = {
  calorias: { color: 'bg-orange-500', bgColor: 'bg-orange-500/20', max: 500 },
  proteina: { color: 'bg-red-500', bgColor: 'bg-red-500/20', max: 30 },
  carboidrato: { color: 'bg-amber-500', bgColor: 'bg-amber-500/20', max: 80 },
  lipideos: { color: 'bg-yellow-500', bgColor: 'bg-yellow-500/20', max: 50 },
  fibra: { color: 'bg-green-500', bgColor: 'bg-green-500/20', max: 15 },
  calcio: { color: 'bg-blue-500', bgColor: 'bg-blue-500/20', max: 500 },
  magnesio: { color: 'bg-purple-500', bgColor: 'bg-purple-500/20', max: 200 },
  'Ferro (mg)': { color: 'bg-rose-500', bgColor: 'bg-rose-500/20', max: 15 },
  sodio: { color: 'bg-pink-500', bgColor: 'bg-pink-500/20', max: 1000 },
  potasio: { color: 'bg-indigo-500', bgColor: 'bg-indigo-500/20', max: 500 },
  zinco: { color: 'bg-teal-500', bgColor: 'bg-teal-500/20', max: 15 },
}

export function NutrientChart() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Alimento[]>([])
  const [selectedFood, setSelectedFood] = useState<Alimento | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingDetails, setIsLoadingDetails] = useState(false)

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length >= 2) {
        setIsLoading(true)
        const response = await searchAlimentos(query)
        if (response.data) {
          if (Array.isArray(response.data)) {
            setSuggestions(response.data.slice(0, 5))
          } else if ('content' in (response.data as object)) {
            const paginated = response.data as { content: Alimento[] }
            setSuggestions(paginated.content.slice(0, 5))
          }
        }
        setIsLoading(false)
      } else {
        setSuggestions([])
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [query])

  const handleSelectFood = async (alimento: Alimento) => {
    setIsLoadingDetails(true)
    setQuery('')
    setSuggestions([])
    
    const response = await getAlimentoById(alimento.id)
    if (response.data) {
      setSelectedFood(response.data as Alimento)
    }
    setIsLoadingDetails(false)
  }

  const mainNutrients = ['calorias', 'proteina', 'carboidrato', 'lipideos', 'fibra']
  const minerals = ['calcio', 'magnesio', 'Ferro (mg)', 'sodio', 'potasio', 'zinco']

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <BarChart3 className="h-5 w-5" />
          Visualizacao Nutricional
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Busque um alimento para ver seus nutrientes em grafico de barras
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar alimento..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
          {isLoading && (
            <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
          )}
          
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-card border rounded-lg shadow-lg z-10 overflow-hidden">
              {suggestions.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectFood(item)}
                  className="w-full text-left p-3 hover:bg-muted transition-colors border-b last:border-0"
                >
                  <p className="font-medium text-sm">{item.nome}</p>
                  <p className="text-xs text-muted-foreground">{item.categoria}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        {isLoadingDetails && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {selectedFood && !isLoadingDetails && (
          <div className="space-y-6">
            {/* Food Info */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">{selectedFood.nome}</h3>
                <Badge variant="secondary">{selectedFood.categoria}</Badge>
              </div>
              <Button variant="outline" size="sm" onClick={() => setSelectedFood(null)}>
                Limpar
              </Button>
            </div>

            {/* Main Nutrients */}
            <div className="space-y-4">
              <h4 className="font-medium text-sm text-muted-foreground">Macronutrientes</h4>
              <div className="space-y-3">
                {mainNutrients.map((name) => {
                  const nutrient = selectedFood.nutrientes?.find(n => n.nome === name)
                  const info = NUTRIENT_INFO[name] || { color: 'bg-gray-500', bgColor: 'bg-gray-500/20', max: 100 }
                  const percentage = nutrient ? Math.min((nutrient.valor / info.max) * 100, 100) : 0
                  
                  return (
                    <div key={name} className="space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="capitalize font-medium">{name}</span>
                        <span className="font-mono text-muted-foreground">
                          {nutrient ? `${nutrient.valor} ${nutrient.unidade}` : 'N/A'}
                        </span>
                      </div>
                      <div className={cn("h-3 rounded-full overflow-hidden", info.bgColor)}>
                        <div
                          className={cn("h-full rounded-full transition-all duration-500", info.color)}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Minerals */}
            <div className="space-y-4">
              <h4 className="font-medium text-sm text-muted-foreground">Minerais</h4>
              <div className="grid grid-cols-2 gap-4">
                {minerals.map((name) => {
                  const nutrient = selectedFood.nutrientes?.find(n => n.nome === name)
                  const info = NUTRIENT_INFO[name] || { color: 'bg-gray-500', bgColor: 'bg-gray-500/20', max: 100 }
                  const percentage = nutrient ? Math.min((nutrient.valor / info.max) * 100, 100) : 0
                  
                  return (
                    <div key={name} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="capitalize font-medium">{name}</span>
                        <span className="font-mono text-muted-foreground">
                          {nutrient ? `${nutrient.valor}${nutrient.unidade}` : 'N/A'}
                        </span>
                      </div>
                      <div className={cn("h-2 rounded-full overflow-hidden", info.bgColor)}>
                        <div
                          className={cn("h-full rounded-full transition-all duration-500", info.color)}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {!selectedFood && !isLoadingDetails && (
          <div className="text-center py-8">
            <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-sm text-muted-foreground">
              Busque um alimento para visualizar seus nutrientes
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
