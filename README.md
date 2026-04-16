<p align="center">
  <img src="https://img.shields.io/badge/Status-Online-brightgreen?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/Java-Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" alt="Spring Boot" />
  <img src="https://img.shields.io/badge/PostgreSQL-Database-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Deploy-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" alt="Render" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License" />
</p>

<h1 align="center">Tabela Nutricional Brasileira API</h1>

<h4 align="center">API REST de alto desempenho para consulta da composicao nutricional de alimentos brasileiros, baseada na <a href="https://www.cfn.org.br/wp-content/uploads/2017/03/taco_4_edicao_ampliada_e_revisada.pdf">TACO</a> (Tabela Brasileira de Composicao de Alimentos).</h4>

<p align="center">
  <a href="#-site-interativo">Site Interativo</a> •
  <a href="#-inicio-rapido">Inicio Rapido</a> •
  <a href="#-endpoints">Endpoints</a> •
  <a href="#-exemplos-de-codigo">Exemplos</a> •
  <a href="#-estrutura-de-resposta">Estrutura</a> •
  <a href="#-boas-praticas">Boas Praticas</a>
</p>

---

## 🌐 Site Interativo

Alem da API, disponibilizamos um **site interativo** onde voce pode explorar e testar todos os endpoints de forma visual e documentada!

<p align="center">
  <a href="https://api-tabela-nutricional-brasileira.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/Acessar%20Site%20Interativo-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Site Interativo" />
  </a>
</p>

### Recursos do Site:

| Recurso | Descricao |
|---------|-----------|
| **Testador de API** | Execute requisicoes diretamente no navegador e veja as respostas em tempo real |
| **Documentacao Visual** | Navegue pelos endpoints com exemplos interativos |
| **Status em Tempo Real** | Verifique se a API esta online e funcionando |
| **Exemplos de Codigo** | Copie snippets prontos para JavaScript, Python e cURL |
| **Busca de Alimentos** | Interface amigavel para pesquisar alimentos e ver dados nutricionais |

> **Dica:** O site e perfeito para testar a API antes de integrar no seu projeto!

---

## 🎯 Por que usar esta API?

<table>
<tr>
<td width="50%">

### Casos de Uso

- **🏋️ Apps Fitness** - Calcule calorias e macros
- **🏥 Sistemas de Saúde** - Planejamento nutricional
- **📊 Diários Alimentares** - Tracking de nutrientes
- **🎓 Projetos Acadêmicos** - Pesquisas e estudos
- **🤖 IA Nutricional** - Chatbots e assistentes

</td>
<td width="50%">

### Diferenciais

- ✅ **100% Gratuita** - Sem limites de requisições
- ✅ **Dados Oficiais** - Baseada na TACO/UNICAMP
- ✅ **Alta Performance** - Respostas em ms
- ✅ **Documentação Swagger** - Teste interativo
- ✅ **Estrutura Flexível** - Fácil integração

</td>
</tr>
</table>

---

## 🚀 Inicio Rapido

### URLs de Acesso

| Ambiente | URL |
|----------|-----|
| 🌐 **API Base** | [`https://tabelanutricionalbrasileira.onrender.com`](https://tabelanutricionalbrasileira.onrender.com) |
| 🖥️ **Site Interativo** | [`https://api-tabela-nutricional-brasileira.vercel.app`](https://api-tabela-nutricional-brasileira.vercel.app) |

### Teste Rápido

```bash
# Buscar informações nutricionais de banana
curl -X GET "https://tabelanutricionalbrasileira.onrender.com/alimentos/search?nome=banana"
```

---

## ⚡ Endpoints

<img width="100%" alt="Endpoints Swagger" src="https://github.com/user-attachments/assets/84cb8da4-c5cb-4261-89d6-66067a12b93a" />

### 📋 Lista Completa de Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/alimentos` | Lista todos os alimentos disponíveis |
| `GET` | `/alimentos/{id}` | Busca alimento específico pelo ID |
| `GET` | `/alimentos/search` | Busca alimentos pelo nome (parcial ou completo) |
| `GET` | `/alimentos/categoria` | Filtra alimentos por categoria (paginado) |
| `GET` | `/alimentos/busca/autocomplete` | Retorna sugestões de nomes para autocomplete |

---

### 🔍 `GET /alimentos/search`

Busca alimentos pelo nome com suporte a busca parcial.

```http
GET /alimentos/search?nome=arroz&page=0&size=10
```

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `nome` | string | ✅ Sim | Termo de busca do alimento |
| `page` | integer | ❌ Não | Número da página (começa em 0) |
| `size` | integer | ❌ Não | Itens por página (máx: 10) |

<details>
<summary>📦 Exemplo de Resposta</summary>

```json
{
  "content": [
    {
      "id": 61,
      "nome": "Arroz, integral, cozido",
      "categoria": "Cereais e derivados",
      "nutrientes": [
        { "nome": "calorias", "unidade": "kcal", "valor": 124.0 },
        { "nome": "proteina", "unidade": "g", "valor": 2.6 },
        { "nome": "carboidrato", "unidade": "g", "valor": 25.8 }
      ]
    }
  ],
  "totalElements": 15,
  "totalPages": 2
}
```

</details>

---

### 📄 `GET /alimentos/{id}`

Retorna informações completas de um alimento específico.

```http
GET /alimentos/175
```

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `id` | integer | ✅ Sim | ID único do alimento |

<details>
<summary>📦 Exemplo de Resposta</summary>

```json
{
  "id": 175,
  "nome": "Banana, da terra, crua",
  "categoria": "Frutas e derivados",
  "nutrientes": [
    { "nome": "calorias", "unidade": "kcal", "valor": 128.0 },
    { "nome": "proteina", "unidade": "g", "valor": 1.4 },
    { "nome": "lipideos", "unidade": "g", "valor": 0.1 },
    { "nome": "carboidrato", "unidade": "g", "valor": 33.7 },
    { "nome": "fibra", "unidade": "g", "valor": 1.5 },
    { "nome": "calcio", "unidade": "mg", "valor": 4.0 },
    { "nome": "ferro", "unidade": "mg", "valor": 0.4 },
    { "nome": "sodio", "unidade": "mg", "valor": 1.0 },
    { "nome": "potassio", "unidade": "mg", "valor": 328.0 },
    { "nome": "vitamina_c", "unidade": "mg", "valor": 15.7 }
  ]
}
```

</details>

---

### 🏷️ `GET /alimentos/categoria`

Filtra alimentos por categoria alimentar com paginação.

```http
GET /alimentos/categoria?categoriaAlimentar=bebida&page=0&size=10
```

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `categoriaAlimentar` | string | ✅ Sim | Nome da categoria |
| `page` | integer | ❌ Não | Número da página (começa em 0) |
| `size` | integer | ❌ Não | Itens por página (máx: 10) |

**Categorias disponíveis:**
- `cereais` - Cereais e derivados
- `verduras` - Verduras, hortaliças e derivados
- `frutas` - Frutas e derivados
- `gorduras` - Gorduras e óleos
- `pescados` - Pescados e frutos do mar
- `carnes` - Carnes e derivados
- `leite` - Leite e derivados
- `bebida` - Bebidas
- `ovos` - Ovos e derivados
- `acucarados` - Produtos açucarados
- `miscelaneas` - Miscelâneas
- `leguminosas` - Leguminosas e derivados
- `nozes` - Nozes e sementes

---

### ✨ `GET /alimentos/busca/autocomplete`

Retorna sugestões de nomes de alimentos para implementar autocomplete.

```http
GET /alimentos/busca/autocomplete?nome=arr
```

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `nome` | string | ✅ Sim | Termo para autocomplete (mínimo 2 caracteres) |

<details>
<summary>📦 Exemplo de Resposta</summary>

```json
[
  "Arroz, integral, cozido",
  "Arroz, tipo 1, cozido",
  "Arroz, tipo 2, cozido",
  "Arroz, integral, cru",
  "Arroz, tipo 1, cru"
]
```

</details>

---

## 💻 Exemplos de Código

### JavaScript / TypeScript

```javascript
const BASE_URL = 'https://tabelanutricionalbrasileira.onrender.com';

// Buscar alimentos por nome
async function buscarAlimentos(nome) {
  const response = await fetch(`${BASE_URL}/alimentos/search?nome=${encodeURIComponent(nome)}`);
  return response.json();
}

// Buscar por ID
async function buscarPorId(id) {
  const response = await fetch(`${BASE_URL}/alimentos/${id}`);
  return response.json();
}

// Filtrar por categoria (paginado - máximo 10 itens)
async function filtrarPorCategoria(categoria, page = 0) {
  const response = await fetch(
    `${BASE_URL}/alimentos/categoria?categoriaAlimentar=${encodeURIComponent(categoria)}&page=${page}&size=10`
  );
  return response.json();
}

// Autocomplete
async function autocomplete(termo) {
  const response = await fetch(`${BASE_URL}/alimentos/busca/autocomplete?nome=${encodeURIComponent(termo)}`);
  return response.json();
}

// Exemplo de uso
const resultados = await buscarAlimentos('banana');
console.log(resultados);
```

### Python

```python
import requests

BASE_URL = "https://tabelanutricionalbrasileira.onrender.com"

def buscar_alimentos(nome: str) -> dict:
    """Busca alimentos pelo nome"""
    response = requests.get(f"{BASE_URL}/alimentos/search", params={"nome": nome})
    response.raise_for_status()
    return response.json()

def buscar_por_id(id: int) -> dict:
    """Busca alimento pelo ID"""
    response = requests.get(f"{BASE_URL}/alimentos/{id}")
    response.raise_for_status()
    return response.json()

def filtrar_por_categoria(categoria: str, page: int = 0, size: int = 10) -> dict:
    """Filtra alimentos por categoria (máximo 10 itens por página)"""
    response = requests.get(
        f"{BASE_URL}/alimentos/categoria",
        params={"categoriaAlimentar": categoria, "page": page, "size": min(size, 10)}
    )
    response.raise_for_status()
    return response.json()

def autocomplete(termo: str) -> list:
    """Retorna sugestões de autocomplete"""
    response = requests.get(f"{BASE_URL}/alimentos/busca/autocomplete", params={"nome": termo})
    response.raise_for_status()
    return response.json()

# Exemplo de uso
if __name__ == "__main__":
    alimentos = buscar_alimentos("arroz")
    print(f"Encontrados: {len(alimentos.get('content', []))} alimentos")
    
    for alimento in alimentos.get("content", [])[:3]:
        print(f"- {alimento['nome']}")
```

### cURL

```bash
# Listar todos os alimentos
curl -X GET "https://tabelanutricionalbrasileira.onrender.com/alimentos"

# Buscar por nome
curl -X GET "https://tabelanutricionalbrasileira.onrender.com/alimentos/search?nome=banana"

# Buscar por ID
curl -X GET "https://tabelanutricionalbrasileira.onrender.com/alimentos/175"

# Filtrar por categoria (paginado - máximo 10 itens)
curl -X GET "https://tabelanutricionalbrasileira.onrender.com/alimentos/categoria?categoriaAlimentar=bebida&page=0&size=10"

# Autocomplete
curl -X GET "https://tabelanutricionalbrasileira.onrender.com/alimentos/busca/autocomplete?nome=arr"
```

### React Hook (SWR)

```tsx
import useSWR from 'swr';

const BASE_URL = 'https://tabelanutricionalbrasileira.onrender.com';
const fetcher = (url: string) => fetch(url).then(res => res.json());

// Hook para buscar alimentos
export function useAlimentos(nome: string) {
  const { data, error, isLoading } = useSWR(
    nome ? `${BASE_URL}/alimentos/search?nome=${encodeURIComponent(nome)}` : null,
    fetcher
  );
  
  return {
    alimentos: data?.content || [],
    isLoading,
    isError: error
  };
}

// Hook para autocomplete
export function useAutocomplete(termo: string) {
  const { data, error, isLoading } = useSWR(
    termo.length >= 2 ? `${BASE_URL}/alimentos/busca/autocomplete?nome=${encodeURIComponent(termo)}` : null,
    fetcher
  );
  
  return {
    sugestoes: data || [],
    isLoading,
    isError: error
  };
}
```

---

## 📦 Estrutura de Resposta

A API utiliza uma **estrutura dinâmica de nutrientes**, permitindo evolução sem quebra de contrato.

### Objeto Alimento

```typescript
interface Alimento {
  id: number;
  nome: string;
  categoria: string;
  nutrientes: Nutriente[];
}

interface Nutriente {
  nome: string;      // Ex: "calorias", "proteina", "carboidrato"
  unidade: string;   // Ex: "kcal", "g", "mg"
  valor: number;     // Valor numérico do nutriente
}
```

### Resposta Paginada

```typescript
interface PaginatedResponse<T> {
  content: T[];           
  totalElements: number;  
  totalPages: number;     
}
```

---

## ❗ Códigos de Resposta

| Código | Status | Descrição |
|--------|--------|-----------|
| `200` | ✅ OK | Requisição bem-sucedida |
| `400` | ⚠️ Bad Request | Parâmetros inválidos ou ausentes |
| `404` | 🔍 Not Found | Alimento não encontrado |
| `500` | ❌ Server Error | Erro interno do servidor |

---

## 📌 Boas Práticas

<table>
<tr>
<td>

### ✅ Faça

- Trate nutrientes como lista dinâmica
- Implemente cache local (5-15 min)
- Use paginação nas buscas
- Normalize termos de busca (lowercase)
- Trate erros de rede graciosamente

</td>
<td>

### ❌ Evite

- Depender da ordem dos nutrientes
- Requisições sem tratamento de erro
- Ignorar o limite de paginação (max: 10)
- Hardcode de IDs de alimentos
- Buscar lista completa sem necessidade

</td>
</tr>
</table>

---

## 🧠 Arquitetura

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Cliente/App   │────▶│   Spring Boot   │────▶│   PostgreSQL    │
│  (REST Client)  │◀────│   (API REST)    │◀────│   (Database)    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                               │
                               ▼
                        ┌─────────────────┐
                        │  Swagger/OpenAPI│
                        │  (Documentação) │
                        └─────────────────┘
```

### Decisões Técnicas

| Decisão | Benefício |
|---------|-----------|
| **Estrutura dinâmica de nutrientes** | Permite adicionar novos nutrientes sem quebrar contratos existentes |
| **DTO Pattern** | Separação clara entre entidades de banco e objetos de resposta |
| **Camada de serviço** | Tratamento centralizado (valores nulos → 0.0) |
| **Paginação obrigatória** | Performance consistente em grandes volumes |

---

## 🧰 Stack Tecnológica

<p align="center">
  <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java" />
  <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white" alt="Spring Boot" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=black" alt="Swagger" />
  <img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" alt="Render" />
</p>

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um Fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona NovaFeature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abrir um Pull Request

---

## 👨‍💻 Autor

<p align="center">
  <strong>Desenvolvido com ❤️ por Josué Goulart</strong>
</p>

<p align="center">
  <a href="https://github.com/JosueGoulart01">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  </a>
</p>

---

## 📜 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

```
MIT License

Copyright (c) 2026 Josué Goulart

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

<p align="center">
  <sub>⭐ Se este projeto te ajudou, considere dar uma estrela!</sub>
</p>
