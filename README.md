🚀 POC Orders – Documentação Completa

Este repositório contém uma prova de conceito (POC) de um sistema de
pedidos composto por:

-   API em .NET 8 (Orders.Api)
-   Worker em .NET 8 (Orders.Worker)
-   Frontend em React + Tailwind (Orders.Frontend)
-   PostgreSQL
-   Docker Compose para orquestração completa

------------------------------------------------------------------------

📁 Estrutura do Projeto

    poc-orders/
    │
    ├── backend/
    │   └── Orders.Api/
    │
    ├── worker/
    │   └── Orders.Worker/
    │
    ├── frontend/
    │   └── app/
    │
    └── docker-compose.yml

------------------------------------------------------------------------

⚙️ Tecnologias Usadas

Backend / API

-   .NET 8
-   EF Core + Npgsql
-   Minimal APIs
-   HealthChecks
-   Azure Service Bus (mockado)

Worker

-   .NET 8 Worker Service
-   Azure Service Bus Consumer

Frontend

-   React (Create React App)
-   Tailwind 3.x
-   Axios
-   React Router DOM

Infra

-   Docker
-   Docker Compose
-   PostgreSQL 16

------------------------------------------------------------------------

🧱 Como Rodar Localmente (Sem Docker)

1. Backend

    cd backend/Orders.Api
    dotnet restore
    dotnet run

A API subirá em:

    http://localhost:5000

2. Frontend

    cd frontend/app
    npm install
    npm start

Frontend acessível em:

    http://localhost:3000

3. Banco PostgreSQL

Configure sua conexão no:

    backend/Orders.Api/appsettings.json

Exemplo:

    "ConnectionStrings": {
      "Default": "Host=localhost;Port=5432;Database=orders;Username=postgres;Password=postgres"
    }

------------------------------------------------------------------------

🐳 Como Rodar com Docker Compose

  ⚠️ Importante: certifique-se de estar na pasta raiz do projeto.

    docker compose build --no-cache
    docker compose up -d

Serviços disponíveis:

  Serviço      URL
  ------------ -----------------------
  API          http://localhost:5000
  Frontend     http://localhost:3000
  PostgreSQL   localhost:5432

------------------------------------------------------------------------

🌐 Endpoints da API

GET /orders

Retorna todos os pedidos.

GET /orders/{id}

Retorna um pedido específico.

POST /orders

Cria um pedido.

Example:

    {
      "cliente": "João",
      "produto": "Cadeira",
      "valor": 199.99,
      "status": "Pendente"
    }

------------------------------------------------------------------------

👷 Worker – Fluxo

O Worker consome mensagens da fila orders e processa pedidos.

Fluxo:

1.  API cria o pedido
2.  API publica mensagem no Service Bus
3.  Worker consome mensagem
4.  Worker registra log/processamento

------------------------------------------------------------------------

🎨 Frontend – Funcionalidades

-   Lista de pedidos
-   Formulário de criação
-   Integração total com API
-   Layout estilizado com Tailwind
-   Navegação com React Router DOM

------------------------------------------------------------------------

📌 Como Tailwind foi configurado

Tailwind 3.x é obrigatório com Create React App.

Arquivos incluídos:

-   tailwind.config.js
-   postcss.config.js
-   index.css com:

    @tailwind base;
    @tailwind components;
    @tailwind utilities;

------------------------------------------------------------------------

🧪 Testes

Teste básico da API:

    curl http://localhost:5000/orders

Teste de criação:

    curl -X POST http://localhost:5000/orders -H "Content-Type: application/json" -d "{"cliente":"Naty","produto":"Café","valor":10.5}"

------------------------------------------------------------------------

🛠 Problemas Comuns e Soluções

❌ API não sobe

Verifique: - Conexão com Postgres - Pacotes incompatíveis com .NET 8 -
HealthChecks com ServiceBus sem configuração → usar valores fake

❌ Frontend com “Network Error”

Causas: - API não está rodando - Porta errada - CORS faltando

❌ Docker build falha

Causas: - Dockerfile apontando .NET 9 em projeto .NET 8 - Worker sem
csproj - COPY errado no Dockerfile

------------------------------------------------------------------------

📜 Licença

Projeto acadêmico / teste prático – livre para estudo.

------------------------------------------------------------------------

✨ Criado por:

Natalia Silva (Naty)
Full Stack Developer | Tech Lead
