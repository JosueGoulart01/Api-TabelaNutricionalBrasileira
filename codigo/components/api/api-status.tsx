'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2, XCircle, Loader2, RefreshCw, AlertTriangle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface EndpointStatus {
  path: string
  status: 'loading' | 'success' | 'error' | 'pending'
  statusCode?: number
}

const ENDPOINTS_TO_CHECK = [
  { path: '/alimentos', name: 'Listar Todos' },
  { path: '/alimentos/1', name: 'Buscar por ID' },
  { path: '/alimentos/search?nome=arroz', name: 'Buscar por Nome' },
  { path: '/alimentos/categoria?categoria=Cereais', name: 'Filtrar Categoria' },
  { path: '/alimentos/busca/autocomplete?termo=arroz', name: 'Autocomplete' },
]

export function ApiStatus() {
  const [statuses, setStatuses] = useState<EndpointStatus[]>(
    ENDPOINTS_TO_CHECK.map(e => ({ path: e.path, status: 'pending' }))
  )
  const [isChecking, setIsChecking] = useState(false)
  const [lastCheck, setLastCheck] = useState<Date | null>(null)

  const checkEndpoints = async () => {
    setIsChecking(true)
    setStatuses(ENDPOINTS_TO_CHECK.map(e => ({ path: e.path, status: 'loading' })))

    const results = await Promise.all(
      ENDPOINTS_TO_CHECK.map(async (endpoint) => {
        try {
          const response = await fetch(`/api/alimentos?path=${encodeURIComponent(endpoint.path)}`)
          const data = await response.json()
          return {
            path: endpoint.path,
            status: data.status >= 200 && data.status < 300 ? 'success' : 'error',
            statusCode: data.status,
          } as EndpointStatus
        } catch {
          return {
            path: endpoint.path,
            status: 'error',
            statusCode: 0,
          } as EndpointStatus
        }
      })
    )

    setStatuses(results)
    setIsChecking(false)
    setLastCheck(new Date())
  }

  useEffect(() => {
    checkEndpoints()
  }, [])

  const successCount = statuses.filter(s => s.status === 'success').length
  const errorCount = statuses.filter(s => s.status === 'error').length
  const allSuccess = errorCount === 0 && successCount === ENDPOINTS_TO_CHECK.length
  const allError = errorCount === ENDPOINTS_TO_CHECK.length

  return (
    <Card className={cn(
      "border-2 transition-colors",
      allSuccess && "border-emerald-500/30 bg-emerald-500/5",
      allError && "border-red-500/30 bg-red-500/5",
      !allSuccess && !allError && "border-amber-500/30 bg-amber-500/5"
    )}>
      <CardContent className="p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            {allSuccess ? (
              <div className="rounded-full bg-emerald-500/20 p-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              </div>
            ) : allError ? (
              <div className="rounded-full bg-red-500/20 p-2">
                <XCircle className="h-5 w-5 text-red-500" />
              </div>
            ) : (
              <div className="rounded-full bg-amber-500/20 p-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              </div>
            )}
            <div>
              <h3 className="font-semibold">
                Status da API
                {allSuccess && <span className="text-emerald-600 dark:text-emerald-400"> - Todos Operacionais</span>}
                {allError && <span className="text-red-600 dark:text-red-400"> - Servidor Indisponivel</span>}
                {!allSuccess && !allError && <span className="text-amber-600 dark:text-amber-400"> - Parcialmente Operacional</span>}
              </h3>
              <p className="text-sm text-muted-foreground">
                {successCount} de {ENDPOINTS_TO_CHECK.length} endpoints funcionando
                {lastCheck && (
                  <span className="ml-2">
                    - Verificado as {lastCheck.toLocaleTimeString('pt-BR')}
                  </span>
                )}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={checkEndpoints}
            disabled={isChecking}
          >
            <RefreshCw className={cn("mr-2 h-4 w-4", isChecking && "animate-spin")} />
            Verificar Novamente
          </Button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
          {ENDPOINTS_TO_CHECK.map((endpoint, index) => {
            const status = statuses[index]
            return (
              <div
                key={endpoint.path}
                className={cn(
                  "flex items-center gap-2 rounded-lg border p-2 transition-colors",
                  status.status === 'success' && "border-emerald-500/30 bg-emerald-500/10",
                  status.status === 'error' && "border-red-500/30 bg-red-500/10",
                  status.status === 'loading' && "border-border bg-muted/50",
                  status.status === 'pending' && "border-border bg-muted/30"
                )}
              >
                {status.status === 'loading' ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                ) : status.status === 'success' ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                ) : status.status === 'error' ? (
                  <XCircle className="h-3.5 w-3.5 text-red-500" />
                ) : (
                  <div className="h-3.5 w-3.5 rounded-full bg-muted" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{endpoint.name}</p>
                  {status.statusCode !== undefined && status.statusCode > 0 && (
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "text-[10px] px-1 py-0",
                        status.status === 'success' && "text-emerald-600",
                        status.status === 'error' && "text-red-600"
                      )}
                    >
                      {status.statusCode}
                    </Badge>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
