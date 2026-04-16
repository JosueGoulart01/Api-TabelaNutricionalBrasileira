'use client'

import { Leaf, Github, ExternalLink, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/25">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-foreground">
                NutriBrasil
              </h1>
              <Badge variant="secondary" className="text-xs font-normal hidden sm:inline-flex">
                API v1.0
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground hidden sm:block">
              Tabela Nutricional Brasileira
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <a
              href="https://tabelanutricionalbrasileira.onrender.com/swagger-ui.html"
              target="_blank"
              rel="noopener noreferrer"
              className="gap-1.5"
            >
              Swagger
              <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a
              href="https://tabelanutricionalbrasileira.onrender.com"
              target="_blank"
              rel="noopener noreferrer"
              className="gap-1.5"
            >
              API Base
              <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
          <div className="h-4 w-px bg-border" />
          <Button variant="outline" size="sm" asChild className="gap-1.5">
            <a
              href="https://github.com/JosueGoulart01/Api-TabelaNutricionalBrasileira"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden border-t border-border bg-background overflow-hidden transition-all duration-200",
        mobileMenuOpen ? "max-h-48" : "max-h-0"
      )}>
        <nav className="flex flex-col gap-1 p-4">
          <Button variant="ghost" size="sm" asChild className="justify-start gap-2">
            <a
              href="https://tabelanutricionalbrasileira.onrender.com/swagger-ui.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4" />
              Swagger UI
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild className="justify-start gap-2">
            <a
              href="https://tabelanutricionalbrasileira.onrender.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4" />
              API Base
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild className="justify-start gap-2">
            <a
              href="https://github.com/JosueGoulart01/Api-TabelaNutricionalBrasileira"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </Button>
        </nav>
      </div>
    </header>
  )
}
