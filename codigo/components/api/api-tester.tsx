'use client'

import { EndpointCard } from './endpoint-card'
import { ENDPOINTS } from '@/types/alimento'

export function ApiTester() {
  return (
    <div className="space-y-3">
      {ENDPOINTS.map((endpoint) => (
        <EndpointCard
          key={endpoint.path}
          endpoint={endpoint}
        />
      ))}
    </div>
  )
}
