'use client'

import { FoodCard } from './food-card'
import { Empty } from '@/components/ui/empty'
import { Spinner } from '@/components/ui/spinner'
import { UtensilsCrossed } from 'lucide-react'
import type { Alimento } from '@/types/alimento'

interface FoodGridProps {
  alimentos: Alimento[]
  isLoading?: boolean
  error?: string | null
}

export function FoodGrid({ alimentos, isLoading, error }: FoodGridProps) {
  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner className="h-8 w-8 text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <Empty
        icon={UtensilsCrossed}
        title="Erro ao carregar"
        description={error}
      />
    )
  }

  if (!alimentos || alimentos.length === 0) {
    return (
      <Empty
        icon={UtensilsCrossed}
        title="Nenhum alimento encontrado"
        description="Tente ajustar os parâmetros da busca"
      />
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {alimentos.map((alimento) => (
        <FoodCard key={alimento.id} alimento={alimento} />
      ))}
    </div>
  )
}
