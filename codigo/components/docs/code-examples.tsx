'use client'

import { useState } from 'react'
import { Copy, Check, Terminal, Code2, FileJson } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

const BASE_URL = 'https://tabelanutricionalbrasileira.onrender.com'

const CODE_EXAMPLES = {
  javascript: {
    label: 'JavaScript',
    icon: Code2,
    color: 'bg-yellow-500/15 text-yellow-600',
    code: `// Buscar todos os alimentos
const response = await fetch('${BASE_URL}/alimentos');
const alimentos = await response.json();
console.log(alimentos);

// Buscar alimento por ID
const alimentoId = 1;
const response2 = await fetch(\`${BASE_URL}/alimentos/\${alimentoId}\`);
const alimento = await response2.json();
console.log(alimento);

// Buscar por nome
const nome = 'arroz';
const response3 = await fetch(\`${BASE_URL}/alimentos/search?nome=\${nome}\`);
const resultados = await response3.json();
console.log(resultados);

// Filtrar por categoria
const categoria = 'Cereais e derivados';
const response4 = await fetch(\`${BASE_URL}/alimentos/categoria?categoria=\${encodeURIComponent(categoria)}\`);
const porCategoria = await response4.json();
console.log(porCategoria);`,
  },
  typescript: {
    label: 'TypeScript',
    icon: Code2,
    color: 'bg-blue-500/15 text-blue-600',
    code: `interface Nutriente {
  nome: string;
  unidade: string;
  valor: number;
}

interface Alimento {
  id: number;
  nome: string;
  categoria: string;
  nutrientes: Nutriente[];
}

// Funcao para buscar alimentos
async function fetchAlimentos(): Promise<Alimento[]> {
  const response = await fetch('${BASE_URL}/alimentos');
  if (!response.ok) throw new Error('Erro ao buscar alimentos');
  return response.json();
}

// Funcao para buscar por ID
async function fetchAlimentoById(id: number): Promise<Alimento> {
  const response = await fetch(\`${BASE_URL}/alimentos/\${id}\`);
  if (!response.ok) throw new Error('Alimento nao encontrado');
  return response.json();
}

// Funcao para buscar por nome
async function searchAlimentos(nome: string): Promise<Alimento[]> {
  const response = await fetch(\`${BASE_URL}/alimentos/search?nome=\${encodeURIComponent(nome)}\`);
  return response.json();
}

// Exemplo de uso
const alimentos = await fetchAlimentos();
console.log(\`Total: \${alimentos.length} alimentos\`);`,
  },
  python: {
    label: 'Python',
    icon: Terminal,
    color: 'bg-green-500/15 text-green-600',
    code: `import requests

BASE_URL = "${BASE_URL}"

# Buscar todos os alimentos
response = requests.get(f"{BASE_URL}/alimentos")
alimentos = response.json()
print(f"Total: {len(alimentos)} alimentos")

# Buscar alimento por ID
alimento_id = 1
response = requests.get(f"{BASE_URL}/alimentos/{alimento_id}")
alimento = response.json()
print(f"Nome: {alimento['nome']}")
print(f"Categoria: {alimento['categoria']}")

# Listar nutrientes
for nutriente in alimento.get('nutrientes', []):
    print(f"  {nutriente['nome']}: {nutriente['valor']} {nutriente['unidade']}")

# Buscar por nome
nome = "arroz"
response = requests.get(f"{BASE_URL}/alimentos/search", params={"nome": nome})
resultados = response.json()
print(f"Encontrados: {len(resultados)} resultados para '{nome}'")

# Filtrar por categoria
categoria = "Cereais e derivados"
response = requests.get(f"{BASE_URL}/alimentos/categoria", params={"categoria": categoria})
por_categoria = response.json()
print(f"Alimentos em '{categoria}': {len(por_categoria)}")`,
  },
  curl: {
    label: 'cURL',
    icon: Terminal,
    color: 'bg-gray-500/15 text-gray-600',
    code: `# Buscar todos os alimentos
curl -X GET "${BASE_URL}/alimentos"

# Buscar alimento por ID
curl -X GET "${BASE_URL}/alimentos/1"

# Buscar por nome (parcial ou completo)
curl -X GET "${BASE_URL}/alimentos/search?nome=arroz"

# Filtrar por categoria
curl -X GET "${BASE_URL}/alimentos/categoria?categoria=Cereais%20e%20derivados"

# Autocomplete de nomes
curl -X GET "${BASE_URL}/alimentos/busca/autocomplete?termo=arr"

# Com headers formatados
curl -X GET "${BASE_URL}/alimentos" \\
  -H "Accept: application/json" \\
  -H "Content-Type: application/json"`,
  },
  java: {
    label: 'Java',
    icon: Code2,
    color: 'bg-red-500/15 text-red-600',
    code: `import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

public class AlimentoAPI {
    private static final String BASE_URL = "${BASE_URL}";
    private static final HttpClient client = HttpClient.newHttpClient();
    
    // Buscar todos os alimentos
    public static String getAllAlimentos() throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(BASE_URL + "/alimentos"))
            .GET()
            .build();
        
        HttpResponse<String> response = client.send(
            request, HttpResponse.BodyHandlers.ofString()
        );
        return response.body();
    }
    
    // Buscar por ID
    public static String getAlimentoById(int id) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(BASE_URL + "/alimentos/" + id))
            .GET()
            .build();
        
        HttpResponse<String> response = client.send(
            request, HttpResponse.BodyHandlers.ofString()
        );
        return response.body();
    }
    
    public static void main(String[] args) throws Exception {
        String alimentos = getAllAlimentos();
        System.out.println(alimentos);
    }
}`,
  },
}

export function CodeExamples() {
  const [copiedTab, setCopiedTab] = useState<string | null>(null)

  const handleCopy = async (language: string) => {
    const example = CODE_EXAMPLES[language as keyof typeof CODE_EXAMPLES]
    if (example) {
      await navigator.clipboard.writeText(example.code)
      setCopiedTab(language)
      setTimeout(() => setCopiedTab(null), 2000)
    }
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <FileJson className="h-5 w-5" />
          Exemplos de Codigo
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Copie e use estes exemplos para integrar a API no seu projeto
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="javascript" className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto">
            {Object.entries(CODE_EXAMPLES).map(([key, example]) => {
              const Icon = example.icon
              return (
                <TabsTrigger key={key} value={key} className="gap-2">
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{example.label}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>
          
          {Object.entries(CODE_EXAMPLES).map(([key, example]) => (
            <TabsContent key={key} value={key} className="mt-4">
              <div className="rounded-xl border border-border overflow-hidden">
                <div className="flex items-center justify-between bg-sidebar-accent/50 px-4 py-2.5 border-b">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={example.color}>
                      {example.label}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(key)}
                    className="h-7 gap-1.5"
                  >
                    {copiedTab === key ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="text-xs">Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span className="text-xs">Copiar</span>
                      </>
                    )}
                  </Button>
                </div>
                <pre className="overflow-x-auto p-4 text-xs bg-sidebar text-sidebar-foreground font-mono leading-relaxed max-h-[400px]">
                  <code>{example.code}</code>
                </pre>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
