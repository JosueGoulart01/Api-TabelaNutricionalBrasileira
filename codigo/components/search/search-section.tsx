'use client'

import { useState, useCallback, useEffect } from 'react'
import { Search, X, AlertCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FoodGrid } from '@/components/food/food-grid'
import { searchAlimentos, getAutocomplete, getStatusColor } from '@/lib/api'
import type { Alimento } from '@/types/alimento'

interface PaginatedResponse {
  content: Alimento[]
  totalElements: number
  totalPages: number
  number: number
  size: number
}

export function SearchSection() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [alimentos, setAlimentos] = useState<Alimento[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)
  const [totalResults, setTotalResults] = useState(0)
  const [responseStatus, setResponseStatus] = useState<{ status: number; duration: number } | null>(null)

  const fetchSuggestions = useCallback(async (nome: string) => {
    if (nome.length < 2) {
      setSuggestions([])
      return
    }
    const response = await getAutocomplete(nome)
    if (response.data && Array.isArray(response.data)) {
      setSuggestions(response.data.slice(0, 5))
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSuggestions(query)
    }, 300)
    return () => clearTimeout(timer)
  }, [query, fetchSuggestions])

  const handleSearch = async (searchTerm?: string) => {
    const term = searchTerm || query
    if (!term.trim()) return

    setIsLoading(true)
    setError(null)
    setHasSearched(true)
    setSuggestions([])

    const response = await searchAlimentos(term)
    
    setResponseStatus({ status: response.status, duration: response.duration })

    if (response.error) {
      setError(response.error)
      setAlimentos([])
      setTotalResults(0)
    } else if (response.data) {
      // A API retorna dados paginados com "content"
      if ('content' in response.data && Array.isArray(response.data.content)) {
        const paginatedData = response.data as unknown as PaginatedResponse
        setAlimentos(paginatedData.content)
        setTotalResults(paginatedData.totalElements || paginatedData.content.length)
      } else if (Array.isArray(response.data)) {
        // Fallback caso retorne array direto
        setAlimentos(response.data as unknown as Alimento[])
        setTotalResults((response.data as unknown as Alimento[]).length)
      } else {
        setAlimentos([])
        setTotalResults(0)
      }
    }
    setIsLoading(false)
  }

  const handleClear = () => {
    setQuery('')
    setAlimentos([])
    setSuggestions([])
    setHasSearched(false)
    setError(null)
    setTotalResults(0)
    setResponseStatus(null)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    setSuggestions([])
    handleSearch(suggestion)
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar alimentos... (ex: arroz, feijão, banana)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="h-12 pl-10 pr-10"
            />
            {query && (
              <button
                onClick={handleClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Button onClick={() => handleSearch()} disabled={isLoading} size="lg">
            {isLoading ? 'Buscando...' : 'Buscar'}
          </Button>
        </div>

        {/* Autocomplete suggestions */}
        {suggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-10 mt-1 rounded-lg border border-border bg-card p-2 shadow-lg">
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <Badge
                  key={suggestion}
                  variant="secondary"
                  className="cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {hasSearched && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-lg font-semibold text-foreground">
              Resultados
              {totalResults > 0 && (
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({totalResults} encontrados)
                </span>
              )}
            </h3>
            {responseStatus && (
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="outline" className={getStatusColor(responseStatus.status)}>
                  Status: {responseStatus.status}
                </Badge>
                <span className="text-muted-foreground">{responseStatus.duration.toFixed(0)}ms</span>
              </div>
            )}
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <FoodGrid alimentos={alimentos} isLoading={isLoading} error={null} />
        </div>
      )}
    </div>
  )
}
