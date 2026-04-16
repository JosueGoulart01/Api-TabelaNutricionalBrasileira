import { NextRequest, NextResponse } from 'next/server'

const BASE_URL = 'https://tabelanutricionalbrasileira.onrender.com'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const endpoint = searchParams.get('endpoint') || '/alimentos'
  
  const startTime = performance.now()
  
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    })
    
    const duration = performance.now() - startTime
    
    let data = null
    const contentType = response.headers.get('content-type')
    
    if (contentType?.includes('application/json')) {
      try {
        data = await response.json()
      } catch {
        data = null
      }
    } else {
      const text = await response.text()
      data = { raw: text }
    }
    
    return NextResponse.json({
      data,
      status: response.status,
      statusText: response.statusText,
      duration: Math.round(duration),
      url: `${BASE_URL}${endpoint}`,
      headers: Object.fromEntries(response.headers.entries()),
    })
  } catch (error) {
    const duration = performance.now() - startTime
    
    return NextResponse.json({
      data: null,
      status: 0,
      statusText: 'Network Error',
      error: error instanceof Error ? error.message : 'Erro de conexão com a API',
      duration: Math.round(duration),
      url: `${BASE_URL}${endpoint}`,
    }, { status: 502 })
  }
}
