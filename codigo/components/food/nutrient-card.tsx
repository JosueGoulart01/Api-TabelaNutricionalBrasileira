import { cn } from '@/lib/utils'
import type { Nutriente } from '@/types/alimento'

interface NutrientCardProps {
  nutriente: Nutriente
  className?: string
}

const nutrientIcons: Record<string, string> = {
  calorias: '🔥',
  proteina: '💪',
  lipideos: '🫒',
  carboidrato: '🍞',
  fibra: '🥬',
  calcio: '🦴',
  magnesio: '⚡',
  ferro: '🩸',
  'ferro (mg)': '🩸',
  sodio: '🧂',
  potasio: '🍌',
  zinco: '🛡️',
}

const nutrientColors: Record<string, string> = {
  calorias: 'bg-orange-100 text-orange-700 border-orange-200',
  proteina: 'bg-blue-100 text-blue-700 border-blue-200',
  lipideos: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  carboidrato: 'bg-amber-100 text-amber-700 border-amber-200',
  fibra: 'bg-green-100 text-green-700 border-green-200',
  calcio: 'bg-slate-100 text-slate-700 border-slate-200',
  magnesio: 'bg-purple-100 text-purple-700 border-purple-200',
  ferro: 'bg-red-100 text-red-700 border-red-200',
  'ferro (mg)': 'bg-red-100 text-red-700 border-red-200',
  sodio: 'bg-gray-100 text-gray-700 border-gray-200',
  potasio: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  zinco: 'bg-cyan-100 text-cyan-700 border-cyan-200',
}

export function NutrientCard({ nutriente, className }: NutrientCardProps) {
  const key = nutriente.nome.toLowerCase()
  const icon = nutrientIcons[key] || '📊'
  const colorClass = nutrientColors[key] || 'bg-muted text-muted-foreground border-border'

  return (
    <div
      className={cn(
        'flex items-center justify-between rounded-lg border p-3 transition-all hover:scale-[1.02]',
        colorClass,
        className
      )}
    >
      <div className="flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <span className="text-sm font-medium capitalize">{nutriente.nome}</span>
      </div>
      <div className="text-right">
        <span className="font-semibold">{nutriente.valor}</span>
        <span className="ml-1 text-xs opacity-70">{nutriente.unidade}</span>
      </div>
    </div>
  )
}
