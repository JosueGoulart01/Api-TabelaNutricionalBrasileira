# 🥗 Tabela Nutricional Brasileira API

API REST de alto desempenho para consulta da composição nutricional de alimentos brasileiros baseada na **TACO (Tabela Brasileira de Composição de Alimentos)**.

Projetada para integração com:
- Aplicativos fitness 🏋️
- Sistemas de saúde 🏥  
- Diários alimentares 📊  
- Projetos acadêmicos 🎓  

---

## 🧰 Tecnologias

![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgresql-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

- Java + Spring Boot  
- PostgreSQL  
- Deploy em Render  
- Documentação com Swagger  

---

## 🚀 Acesso Rápido

| Ambiente      | URL |
|--------------|-----|
| 🌐 Produção   | https://tabelanutricionalbrasileira.onrender.com |
| 📄 Swagger    | https://tabelanutricionalbrasileira.onrender.com/swagger-ui/index.html |

---

## ⚡ Como Consumir a API

### 🔍 Buscar alimentos
```http
GET /alimentos/search?nome=banana
Parâmetros
Nome	Tipo	Obrigatório	Descrição
nome	string	✅	Termo de busca do alimento
📄 Buscar alimento por ID
GET /alimentos/{id}
Exemplo
GET /alimentos/175
📦 Estrutura de Resposta

A API utiliza uma estrutura flexível de nutrientes para garantir compatibilidade futura.

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
🧠 Decisões de Arquitetura
✔️ Estrutura dinâmica de nutrientes

Evita quebra de contrato ao adicionar novos nutrientes no futuro.

✔️ DTO Pattern

Separação clara entre:

Entidade de banco
Resposta da API
✔️ Camada de serviço com tratamento de dados
Valores nulos convertidos para 0.0
Evita erros no front-end
📌 Boas Práticas de Uso
Sempre trate a lista de nutrientes como dinâmica
Não dependa da ordem dos elementos
Utilize cache local para reduzir chamadas repetidas
Faça paginação na busca (search)
❗ Possíveis Códigos de Resposta
Código	Significado
200	Sucesso
404	Alimento não encontrado
400	Requisição inválida
500	Erro interno
🧪 Exemplo de Consumo (JavaScript)
async function buscarAlimento(nome) {
  const response = await fetch(
    `https://tabelanutricionalbrasileira.onrender.com/alimentos/search?nome=${nome}`
  );

  const data = await response.json();
  return data;
}

👨‍💻 Autor

Desenvolvido por Josué Goulart


