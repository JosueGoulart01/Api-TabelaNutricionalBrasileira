# 🥗 Tabela Nutricional Brasileira API

API REST de alto desempenho para consulta da composição nutricional de alimentos brasileiros, baseada na **TACO (Tabela Brasileira de Composição de Alimentos)**.

Projetada para ser **escalável, flexível e fácil de integrar**, atendendo diferentes tipos de aplicações.

---

## 🎯 Casos de Uso

Esta API pode ser integrada com:

- 🏋️ Aplicativos fitness
- 🏥 Sistemas de saúde
- 📊 Diários alimentares
- 🎓 Projetos acadêmicos
- 🤖 Aplicações com IA nutricional

---

## 🧰 Tecnologias Utilizadas







- ☕ Java + Spring Boot
- 🐘 PostgreSQL
- ☁️ Deploy em Render
- 📄 Documentação interativa com Swagger/OpenAPI

---

## 🚀 Acesso Rápido

| Ambiente    | URL                                                                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| 🌐 Produção | [https://tabelanutricionalbrasileira.onrender.com](https://tabelanutricionalbrasileira.onrender.com)                                             |
| 📄 Swagger  | [https://tabelanutricionalbrasileira.onrender.com/swagger-ui/index.html](https://tabelanutricionalbrasileira.onrender.com/swagger-ui/index.html) |

---

## ⚡ Endpoints

<img width="1081" height="272" alt="Captura de tela 2026-03-31 203840" src="https://github.com/user-attachments/assets/84cb8da4-c5cb-4261-89d6-66067a12b93a" />

### 🔍 Buscar alimentos

```http
GET /alimentos/search?nome=banana
```

#### Parâmetros

| Nome | Tipo   | Obrigatório | Descrição                  |
| ---- | ------ | ----------- | -------------------------- |
| nome | string | ✅           | Termo de busca do alimento |

---

### 📄 Buscar alimento por ID

```http
GET /alimentos/{id}
```

#### Exemplo

```http
GET /alimentos/175
```

---

## 📦 Estrutura de Resposta

A API utiliza uma **estrutura dinâmica de nutrientes**, permitindo evolução sem quebra de contrato.

```json
{
  "id": 175,
  "nome": "Banana, da terra, crua",
  "nutrientes": [
    {
      "nome": "calorias",
      "unidade": "kcal",
      "valor": 128.0
    },
    {
      "nome": "proteina",
      "unidade": "g",
      "valor": 1.4
    }
  ]
}
```

---

## 🧠 Decisões de Arquitetura

### ✔️ Estrutura dinâmica de nutrientes

- Permite adicionar novos nutrientes sem alterar contratos existentes
- Evita versionamento desnecessário da API

### ✔️ DTO Pattern

Separação clara entre:

- 🗄️ Entidades de banco de dados
- 🔄 Objetos de resposta (DTOs)

### ✔️ Camada de serviço

- Tratamento de dados centralizado
- Conversão de valores nulos para `0.0`
- Evita erros no front-end

---

## 📌 Boas Práticas de Uso

- 🔄 Trate a lista de nutrientes como **dinâmica**
- 🚫 Não dependa da ordem dos elementos
- ⚡ Utilize cache local para melhorar performance
- 📄 Implemente paginação na busca (`search`)
- 🔍 Normalize nomes (ex: lowercase) para buscas melhores

---

## ❗ Códigos de Resposta

| Código | Significado              |
| ------ | ------------------------ |
| 200    | Sucesso                  |
| 400    | Requisição inválida      |
| 404    | Alimento não encontrado  |
| 500    | Erro interno do servidor |

---

## 🧪 Exemplo de Consumo (JavaScript)

```javascript
async function buscarAlimento(nome) {
  try {
    const response = await fetch(
      `https://tabelanutricionalbrasileira.onrender.com/alimentos/search?nome=${nome}`
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar alimento");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
```

---

## 🔐 Melhorias Futuras

- 🔑 Autenticação com JWT
- 📊 Paginação e filtros avançados
- ❤️ Favoritos de alimentos
- 📈 Histórico de consumo
- 🤖 Integração com IA para análise nutricional

---

## 👨‍💻 Autor

Desenvolvido por **Josué Goulart**

---

---

## 📜 Licença

Este projeto pode ser utilizado para fins educacionais e comerciais.\
Considere adicionar uma licença (MIT, Apache 2.0, etc.) para maior clareza.

