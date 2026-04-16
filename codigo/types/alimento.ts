export interface Nutriente {
  nome: string
  unidade: string
  valor: number
}

export interface Alimento {
  id: number
  nome: string
  categoria: string
  nutrientes: Nutriente[]
}

export type Endpoint = {
  method: 'GET'
  path: string
  description: string
  params?: {
    name: string
    type: 'path' | 'query'
    description: string
    required: boolean
  }[]
}

export const ENDPOINTS: Endpoint[] = [
  {
    method: 'GET',
    path: '/alimentos',
    description: 'Lista todos os alimentos e informações nutricionais',
  },
  {
    method: 'GET',
    path: '/alimentos/{id}',
    description: 'Busca alimento pelo ID',
    params: [
      {
        name: 'id',
        type: 'path',
        description: 'ID do alimento',
        required: true,
      },
    ],
  },
  {
    method: 'GET',
    path: '/alimentos/search',
    description: 'Busca alimentos pelo nome (parcial ou completo)',
    params: [
      {
        name: 'nome',
        type: 'query',
        description: 'Nome do alimento para buscar',
        required: true,
      },
    ],
  },
  {
    method: 'GET',
    path: '/alimentos/categoria',
    description: 'Filtra alimentos por categoria',
    params: [
      {
        name: 'categoria',
        type: 'query',
        description: 'Nome da categoria',
        required: true,
      },
    ],
  },
  {
    method: 'GET',
    path: '/alimentos/busca/autocomplete',
    description: 'Retorna sugestões de nomes de alimentos',
    params: [
      {
        name: 'termo',
        type: 'query',
        description: 'Termo para autocomplete',
        required: true,
      },
    ],
  },
]
