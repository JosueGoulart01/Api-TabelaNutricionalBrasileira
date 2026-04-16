import type { Alimento } from '@/types/alimento'

export interface ApiResponse<T> {
  data: T | null
  error: string | null
  status: number
  statusText: string
  url: string
  duration: number
  headers?: Record<string, string>
}

export function getStatusColor(status: number): string {
  if (status === 0) return 'bg-muted text-muted-foreground'
  if (status >= 200 && status < 300) return 'bg-green-500/15 text-green-600 dark:text-green-400'
  if (status >= 300 && status < 400) return 'bg-blue-500/15 text-blue-600 dark:text-blue-400'
  if (status >= 400 && status < 500) return 'bg-yellow-500/15 text-yellow-600 dark:text-yellow-400'
  if (status >= 500) return 'bg-red-500/15 text-red-600 dark:text-red-400'
  return 'bg-muted text-muted-foreground'
}

export function getStatusLabel(status: number): string {
  const labels: Record<number, string> = {
    0: 'Network Error',
    200: 'OK',
    201: 'Created',
    204: 'No Content',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Internal Server Error',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
  }
  return labels[status] || `HTTP ${status}`
}

export async function fetchApi<T>(endpoint: string): Promise<ApiResponse<T>> {
  const startTime = performance.now()

  try {
    const response = await fetch(`/api/alimentos?endpoint=${encodeURIComponent(endpoint)}`)
    const duration = performance.now() - startTime
    
    const result = await response.json()
    
    return {
      data: result.data as T,
      error: result.error || null,
      status: result.status,
      statusText: result.statusText || getStatusLabel(result.status),
      url: result.url,
      duration: result.duration || duration,
      headers: result.headers,
    }
  } catch (error) {
    const duration = performance.now() - startTime
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      status: 0,
      statusText: 'Network Error',
      url: endpoint,
      duration,
    }
  }
}

export async function getAllAlimentos(): Promise<ApiResponse<Alimento[]>> {
  return fetchApi<Alimento[]>('/alimentos')
}

export async function getAlimentoById(id: number): Promise<ApiResponse<Alimento>> {
  return fetchApi<Alimento>(`/alimentos/${id}`)
}

export async function searchAlimentos(nome: string, page = 0, size = 10): Promise<ApiResponse<{ content: Alimento[], totalElements: number, totalPages: number }>> {
  // Limita o tamanho máximo a 10
  const limitedSize = Math.min(Math.max(size, 1), 10)
  return fetchApi(`/alimentos/search?nome=${encodeURIComponent(nome)}&page=${page}&size=${limitedSize}`)
}

export async function getAlimentosByCategoria(categoria: string, page = 0, size = 10): Promise<ApiResponse<{ content: Alimento[], totalElements: number, totalPages: number }>> {
  // Limita o tamanho máximo a 10
  const limitedSize = Math.min(Math.max(size, 1), 10)
  return fetchApi(`/alimentos/categoria?categoriaAlimentar=${encodeURIComponent(categoria)}&page=${page}&size=${limitedSize}`)
}

export async function getAutocomplete(nome: string): Promise<ApiResponse<string[]>> {
  return fetchApi<string[]>(`/alimentos/busca/autocomplete?nome=${encodeURIComponent(nome)}`)
}
