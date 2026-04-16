'use client'

import { useState } from 'react'
import { Search, Plus, X, Scale, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { searchAlimentos, getAlimentoById } from '@/lib/api'
import type { Alimento, Nutriente } from '@/types/alimento'
import { cn } from '@/lib/utils'

const NUTRIENT_COLORS: Record<string, string> = {
  calorias: 'bg-orange-500',
  proteina: 'bg-red-500',
  carboidrato: 'bg-amber-500',
  lipideos: 'bg-yellow-500',
  fibra: 'bg-green-500',
  calcio: 'bg-blue-500',
  magnesio: 'bg-purple-500',
  'Ferro (mg)': 'bg-rose-500',
  sodio: 'bg-pink-500',
  potasio: 'bg-indigo-500',
  zinco: 'bg-teal-500',
}

interface CompareItem {
  id: number
  alimento: Alimento
}

export function FoodComparator() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Alimento[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [compareItems, setCompareItems] = useState<CompareItem[]>([])
  const [isAdding, setIsAdding] = useState(false)

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    setIsSearching(true)
    const response = await searchAlimentos(searchQuery)
    if (response.data) {
      if (Array.isArray(response.data)) {
        setSearchResults(response.data.slice(0, 5))
      } else if ('content' in (response.data as object)) {
        const paginated = response.data as { content: Alimento[] }
        setSearchResults(paginated.content.slice(0, 5))
      }
    }
    setIsSearching(false)
  }

  const handleAddFood = async (alimento: Alimento) => {
    if (compareItems.some(item => item.id === alimento.id)) return
    if (compareItems.length >= 4) return
    
    setIsAdding(true)
    const response = await getAlimentoById(alimento.id)
    if (response.data) {
      setCompareItems(prev => [...prev, { id: alimento.id, alimento: response.data as Alimento }])
    }
    setSearchResults([])
    setSearchQuery('')
    setIsAdding(false)
  }

  const handleRemoveFood = (id: number) => {
    setCompareItems(prev => prev.filter(item => item.id !== id))
  }

  const getAllNutrients = (): string[] => {
    const nutrients = new Set<string>()
    compareItems.forEach(item => {
      item.alimento.nutrientes?.forEach(n => nutrients.add(n.nome))
    })
    return Array.from(nutrients)
  }

  const getNutrientValue = (alimento: Alimento, nutrientName: string): Nutriente | undefined => {
    return alimento.nutrientes?.find(n => n.nome === nutrientName)
  }

  const getMaxValue = (nutrientName: string): number => {
    let max = 0
    compareItems.forEach(item => {
      const nutrient = getNutrientValue(item.alimento, nutrientName)
      if (nutrient && nutrient.valor > max) max = nutrient.valor
    })
    return max
  }

  return (
    <div className="space-y-6">
      {/* Search to add */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar alimento para comparar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="pl-10"
            disabled={compareItems.length >= 4}
          />
        </div>
        <Button onClick={handleSearch} disabled={isSearching || compareItems.length >= 4}>
          {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
        </Button>
      </div>

      {compareItems.length >= 4 && (
        <p className="text-sm text-muted-foreground">Maximo de 4 alimentos para comparacao</p>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <Card>
          <CardContent className="p-2">
            <div className="space-y-1">
              {searchResults.map((alimento) => (
                <button
                  key={alimento.id}
                  onClick={() => handleAddFood(alimento)}
                  disabled={isAdding || compareItems.some(item => item.id === alimento.id)}
                  className="flex w-full items-center justify-between rounded-lg p-3 text-left transition-colors hover:bg-muted disabled:opacity-50"
                >
                  <div>
                    <p className="font-medium text-sm">{alimento.nome}</p>
                    <p className="text-xs text-muted-foreground">{alimento.categoria}</p>
                  </div>
                  {isAdding ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Selected Items */}
      {compareItems.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {compareItems.map((item) => (
            <Badge
              key={item.id}
              variant="secondary"
              className="flex items-center gap-2 px-3 py-1.5 text-sm"
            >
              {item.alimento.nome}
              <button
                onClick={() => handleRemoveFood(item.id)}
                className="rounded-full hover:bg-muted-foreground/20 p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Comparison Table */}
      {compareItems.length >= 2 && (
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Scale className="h-5 w-5" />
              Comparacao Nutricional
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium text-muted-foreground">Nutriente</th>
                  {compareItems.map((item) => (
                    <th key={item.id} className="text-left p-3 font-medium">
                      <div className="max-w-[150px] truncate" title={item.alimento.nome}>
                        {item.alimento.nome}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {getAllNutrients().map((nutrientName) => {
                  const maxValue = getMaxValue(nutrientName)
                  return (
                    <tr key={nutrientName} className="border-b last:border-0">
                      <td className="p-3 font-medium capitalize">{nutrientName}</td>
                      {compareItems.map((item) => {
                        const nutrient = getNutrientValue(item.alimento, nutrientName)
                        const isMax = nutrient && nutrient.valor === maxValue && maxValue > 0
                        return (
                          <td key={item.id} className="p-3">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className={cn(
                                    "h-full rounded-full transition-all",
                                    NUTRIENT_COLORS[nutrientName] || 'bg-primary'
                                  )}
                                  style={{
                                    width: `${maxValue > 0 ? ((nutrient?.valor || 0) / maxValue) * 100 : 0}%`,
                                  }}
                                />
                              </div>
                              <span className={cn(
                                "text-xs font-mono min-w-[60px]",
                                isMax && "font-bold text-primary"
                              )}>
                                {nutrient ? `${nutrient.valor} ${nutrient.unidade}` : '-'}
                              </span>
                            </div>
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {compareItems.length === 0 && (
        <div className="text-center py-12">
          <Scale className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Compare Alimentos</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Adicione pelo menos 2 alimentos para comparar seus valores nutricionais lado a lado.
          </p>
        </div>
      )}

      {compareItems.length === 1 && (
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">
            Adicione mais um alimento para iniciar a comparacao
          </p>
        </div>
      )}
    </div>
  )
}
