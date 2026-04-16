'use client'

import { useState } from 'react'
import { ChevronDown, Tag } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { NutrientCard } from './nutrient-card'
import { cn } from '@/lib/utils'
import type { Alimento } from '@/types/alimento'

interface FoodCardProps {
  alimento: Alimento
}

export function FoodCard({ alimento }: FoodCardProps) {
  const [expanded, setExpanded] = useState(false)
  const calorias = alimento.nutrientes.find((n) => n.nome.toLowerCase() === 'calorias')
  const proteina = alimento.nutrientes.find((n) => n.nome.toLowerCase() === 'proteina')
  const carboidrato = alimento.nutrientes.find((n) => n.nome.toLowerCase() === 'carboidrato')

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <h3 className="font-semibold leading-tight text-foreground">
              {alimento.nome}
            </h3>
            <div className="flex items-center gap-2">
              <Tag className="h-3 w-3 text-muted-foreground" />
              <Badge variant="secondary" className="text-xs font-normal">
                {alimento.categoria}
              </Badge>
            </div>
          </div>
          <Badge className="shrink-0 bg-primary/10 text-primary">
            ID: {alimento.id}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-2 rounded-lg bg-muted/50 p-3">
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">
              {calorias?.valor ?? '-'}
            </p>
            <p className="text-xs text-muted-foreground">kcal</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">
              {proteina?.valor ?? '-'}
            </p>
            <p className="text-xs text-muted-foreground">g proteína</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">
              {carboidrato?.valor ?? '-'}
            </p>
            <p className="text-xs text-muted-foreground">g carb</p>
          </div>
        </div>

        {/* Expandable nutrients */}
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-between"
          onClick={() => setExpanded(!expanded)}
        >
          <span className="text-sm">
            {expanded ? 'Ocultar' : 'Ver todos os'} nutrientes
          </span>
          <ChevronDown
            className={cn(
              'h-4 w-4 transition-transform',
              expanded && 'rotate-180'
            )}
          />
        </Button>

        {expanded && (
          <div className="grid gap-2 sm:grid-cols-2">
            {alimento.nutrientes.map((nutriente) => (
              <NutrientCard key={nutriente.nome} nutriente={nutriente} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
