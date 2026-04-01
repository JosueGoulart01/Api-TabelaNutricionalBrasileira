# 🥗 Tabela Nutricional Brasileira API

![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgresql-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

Uma API robusta e escalável desenvolvida para fornecer informações detalhadas sobre a composição nutricional de alimentos consumidos no Brasil. O projeto utiliza dados da **Tabela TACO (NEPA/UNICAMP)** para garantir precisão em aplicações de saúde, fitness e nutrição.

---

## 🚀 Demonstração Online
A API está pronta para consumo nos seguintes links:
- **URL Base:** `https://tabelanutricionalbrasileira.onrender.com`
- **Documentação Swagger:** [Acesse a UI Interativa](https://tabelanutricionalbrasileira.onrender.com/swagger-ui/index.html)

---

## 📋 Funcionalidades
* [x] **Busca Inteligente:** Filtro por nome de alimento com suporte a termos parciais.
* [x] **Paginação de Resultados:** Performance otimizada para grandes volumes de dados.
* [x] **Mapeamento de Nutrientes:** Conversão automática de dados brutos para Macros e Micros.
* [x] **Arquitetura de Proxy:** Controlador preparado para integrar com diferentes front-ends (CORS configurado).

---

## 🔍 Como Utilizar (Endpoints)

### 1. Buscar Alimentos
Lista alimentos baseada em um termo de busca.
- **GET** `/alimentos/search`
- **Parâmetros:**
  - `nome`: Termo pesquisado (ex: "Chocolate").
  - `page`: Número da página (inicia em 0).
  - `size`: Quantidade de itens por página.

### 2. Detalhes do Alimento
Retorna a composição completa de um alimento por ID.
- **GET** `/alimentos/{id}`

---

## 📦 Estrutura do JSON de Resposta

Diferente de APIs estáticas, os nutrientes são entregues em um formato de lista (`Array`), permitindo maior escalabilidade de dados:

```json
{
  "id": 175,
  "nome": "Banana, da terra, crua",
  "categoria": "Frutas e derivados",
  "nutrientes": [
    {
      "nome": "calorias",
      "unidade": "kcal",
      "valor": 128.00
    },
    {
      "nome": "proteina",
      "unidade": "g",
      "valor": 1.40
    },
    {
      "nome": "lipideos",
      "unidade": "g",
      "valor": 0.20
    },
    {
      "nome": "carboidrato",
      "unidade": "g",
      "valor": 33.70
    }
  ]
}
