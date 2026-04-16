'use client'

import { useState } from 'react'
import { ChevronDown, Play, Clock, Link2, CheckCircle2, XCircle, AlertCircle, Loader2, Copy, Check, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { cn } from '@/lib/utils'
import type { Endpoint } from '@/types/alimento'
import { fetchApi, type ApiResponse, getStatusColor, getStatusLabel } from '@/lib/api'

interface EndpointCardProps {
  endpoint: Endpoint
}

function StatusIcon({ status }: { status: number }) {
  if (status === 0) return <AlertCircle className="h-4 w-4" />
  if (status >= 200 && status < 300) return <CheckCircle2 className="h-4 w-4" />
  if (status >= 400) return <XCircle className="h-4 w-4" />
  return <AlertCircle className="h-4 w-4" />
}

export function EndpointCard({ endpoint }: EndpointCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [params, setParams] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<ApiResponse<unknown> | null>(null)
  const [copied, setCopied] = useState(false)

  const handleExecute = async () => {
    let path = endpoint.path
    
    endpoint.params?.forEach((param) => {
      if (param.type === 'path') {
        path = path.replace(`{${param.name}}`, encodeURIComponent(params[param.name] || ''))
      }
    })

    const queryParams = endpoint.params
      ?.filter((p) => p.type === 'query' && params[p.name])
      .map((p) => `${p.name}=${encodeURIComponent(params[p.name])}`)
      .join('&')

    if (queryParams) {
      path += `?${queryParams}`
    }

    setIsLoading(true)
    const result = await fetchApi(path)
    setResponse(result)
    setIsLoading(false)
  }

  const handleCopyResponse = async () => {
    if (response) {
      const text = response.error
        ? JSON.stringify({ error: response.error }, null, 2)
        : JSON.stringify(response.data, null, 2)
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDownloadResponse = () => {
    if (response?.data) {
      const blob = new Blob([JSON.stringify(response.data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${endpoint.path.replace(/\//g, '-').replace(/[{}]/g, '')}-response.json`
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  const getMethodColor = (method: string) => {
    switch (method.toUpperCase()) {
      case 'GET':
        return 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
      case 'POST':
        return 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30'
      case 'PUT':
        return 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
      case 'DELETE':
        return 'bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const getResponseCount = () => {
    if (!response?.data) return null
    if (Array.isArray(response.data)) return response.data.length
    if (typeof response.data === 'object' && 'content' in (response.data as object)) {
      const paginated = response.data as { content: unknown[], totalElements?: number }
      return paginated.totalElements || paginated.content.length
    }
    return 1
  }

  const responseCount = getResponseCount()

  return (
    <Card className={cn(
      "overflow-hidden border-border/50 transition-all",
      isOpen && "border-primary/40 shadow-lg shadow-primary/5",
      !isOpen && "hover:border-primary/30 hover:shadow-md"
    )}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <button className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-muted/50">
            <div className="flex items-center gap-3">
              <Badge 
                variant="outline"
                className={cn('font-mono text-xs font-semibold px-2.5 py-1', getMethodColor(endpoint.method))}
              >
                {endpoint.method}
              </Badge>
              <code className="text-sm font-medium text-foreground">
                {endpoint.path}
              </code>
              {response && (
                <Badge 
                  variant="outline"
                  className={cn('text-xs', getStatusColor(response.status))}
                >
                  {response.status}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden text-sm text-muted-foreground md:block">
                {endpoint.description}
              </span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-muted-foreground transition-transform duration-200',
                  isOpen && 'rotate-180'
                )}
              />
            </div>
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="border-t border-border/50 bg-gradient-to-b from-muted/50 to-muted/20 p-4 space-y-4">
            <p className="text-sm text-muted-foreground md:hidden">
              {endpoint.description}
            </p>

            {endpoint.params && endpoint.params.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                  Parametros
                  <Badge variant="secondary" className="text-xs">
                    {endpoint.params.length}
                  </Badge>
                </h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  {endpoint.params.map((param) => (
                    <div key={param.name} className="space-y-1.5">
                      <label className="flex items-center gap-2 text-sm">
                        <code className="rounded-md bg-secondary px-2 py-0.5 text-xs font-semibold">
                          {param.name}
                        </code>
                        {param.required && (
                          <span className="text-xs text-destructive font-bold">*</span>
                        )}
                        <Badge variant="outline" className="text-xs px-1.5">
                          {param.type}
                        </Badge>
                      </label>
                      <Input
                        placeholder={param.description}
                        value={params[param.name] || ''}
                        onChange={(e) =>
                          setParams((prev) => ({
                            ...prev,
                            [param.name]: e.target.value,
                          }))
                        }
                        className="h-9 bg-background font-mono text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button
              onClick={handleExecute}
              disabled={isLoading}
              size="lg"
              className="w-full sm:w-auto"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Play className="mr-2 h-4 w-4" />
              )}
              {isLoading ? 'Executando...' : 'Executar Requisicao'}
            </Button>

            {response && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge
                    variant="outline"
                    className={cn('flex items-center gap-1.5 font-mono text-sm px-3 py-1', getStatusColor(response.status))}
                  >
                    <StatusIcon status={response.status} />
                    {response.status} {response.statusText || getStatusLabel(response.status)}
                  </Badge>
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {response.duration.toFixed(0)}ms
                  </span>
                  {responseCount !== null && (
                    <Badge variant="secondary" className="text-xs">
                      {responseCount} {responseCount === 1 ? 'resultado' : 'resultados'}
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-start gap-1.5 text-xs text-muted-foreground bg-muted/50 rounded-lg p-2">
                  <Link2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <code className="break-all">{response.url}</code>
                </div>

                {response.status >= 500 && (
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-red-500/20 p-2">
                        <XCircle className="h-5 w-5 text-red-500" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-semibold text-red-600 dark:text-red-400">Erro no Servidor Backend</h4>
                        <p className="text-sm text-muted-foreground">
                          O servidor da API <code className="bg-muted px-1.5 py-0.5 rounded text-xs">tabelanutricionalbrasileira.onrender.com</code> retornou um erro interno.
                          Este endpoint pode estar com problemas ou em manutencao.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="rounded-xl border border-border/50 bg-sidebar overflow-hidden">
                  <div className="flex items-center justify-between border-b border-border/50 bg-sidebar-accent/50 px-4 py-2.5">
                    <span className="text-sm font-medium text-sidebar-foreground">Response Body</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {response.status >= 400 ? 'Error' : 'JSON'}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopyResponse}
                        className="h-7 px-2"
                      >
                        {copied ? (
                          <Check className="h-3.5 w-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </Button>
                      {response.data && response.status < 400 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleDownloadResponse}
                          className="h-7 px-2"
                        >
                          <Download className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                  </div>
                  <pre className="overflow-x-auto p-4 text-xs text-sidebar-foreground max-h-[400px] font-mono leading-relaxed">
                    {response.error
                      ? JSON.stringify({ error: response.error }, null, 2)
                      : JSON.stringify(response.data, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
