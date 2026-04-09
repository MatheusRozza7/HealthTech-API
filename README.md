# 📋 Project_idosos — API de Registro de Atendimentos

Sistema backend para cuidadoras autônomas registrarem e acompanharem os atendimentos dos seus pacientes.

---

## 💡 Problema

Cuidadoras autônomas atendem vários pacientes por semana e enfrentam dificuldades para organizar informações. Anotações ficam espalhadas em cadernos, mensagens e na memória — tornando difícil consultar o histórico de um paciente ou responder rapidamente a familiares.

## ✅ Solução

Uma API REST simples que centraliza o registro de pacientes e atendimentos, permitindo consultar históricos e gerar resumos rápidos.

---

## 🛠️ Tecnologias

- Node.js
- Express
- SQLite (better-sqlite3)

---

## 🚀 Como rodar o projeto

**1. Clone ou baixe o projeto**

**2. Instale as dependências**

```bash
npm install
```

**3. Popule o banco com dados de teste (opcional)**

```bash
node src/database/seed.js
```

**4. Inicie o servidor**

```bash
npm run dev
```

O servidor vai rodar em: `http://localhost:3000`

---

## 🗄️ Estrutura do banco de dados

**Tabela: pacientes**

| Campo              | Tipo    | Descrição                   |
| ------------------ | ------- | --------------------------- |
| id                 | INTEGER | Identificador único         |
| nome               | TEXT    | Nome do paciente            |
| idade              | INTEGER | Idade                       |
| condicoes          | TEXT    | Condições de saúde          |
| contato_familiar   | TEXT    | Nome e telefone do familiar |
| observacoes_gerais | TEXT    | Observações da rotina       |
| criado_em          | TEXT    | Data de cadastro            |

**Tabela: atendimentos**

| Campo        | Tipo    | Descrição                  |
| ------------ | ------- | -------------------------- |
| id           | INTEGER | Identificador único        |
| paciente_id  | INTEGER | Referência ao paciente     |
| data         | TEXT    | Data do atendimento        |
| atividades   | TEXT    | Atividades realizadas      |
| observacoes  | TEXT    | Observações do dia         |
| medicamentos | TEXT    | Medicamentos administrados |
| criado_em    | TEXT    | Data de registro           |

---

## 📡 Rotas da API

### Pacientes

#### `POST /pacientes` — Cadastrar paciente

**Body (JSON):**

```json
{
  "nome": "Maria Aparecida",
  "idade": 78,
  "condicoes": "Hipertensão, diabetes tipo 2",
  "contato_familiar": "Filha Ana Paula - (21) 99999-1234",
  "observacoes_gerais": "Prefere banho pela manhã, toma medicação às 8h e 20h"
}
```

> ⚠️ Campos obrigatórios: `nome` e `idade`

---

#### `GET /pacientes` — Listar todos os pacientes

```
GET http://localhost:3000/pacientes
```

---

#### `GET /pacientes/:id/historico` — Histórico completo do paciente

```
GET http://localhost:3000/pacientes/1/historico
```

Retorna os dados do paciente e todos os atendimentos registrados.

---

#### `GET /pacientes/:id/resumo` — Resumo dos últimos 5 atendimentos

```
GET http://localhost:3000/pacientes/1/resumo
```

Útil para responder rapidamente a familiares.

---

### Atendimentos

#### `POST /atendimentos` — Registrar atendimento

**Body (JSON):**

```json
{
  "paciente_id": 1,
  "data": "2025-04-08",
  "atividades": "Banho, curativo no joelho, caminhada leve",
  "observacoes": "Paciente relatou dor leve nas costas. Humor tranquilo.",
  "medicamentos": "Losartana 50mg às 8h, Metformina 500mg às 20h"
}
```

> ⚠️ Campos obrigatórios: `paciente_id` e `data`

---

#### `GET /atendimentos/:id` — Detalhe de um atendimento

```
GET http://localhost:3000/atendimentos/1
```

---

## 📁 Estrutura do projeto

```
project/
├── src/
│   ├── app.js
│   ├── database/
│   │   ├── database.js       # conexão com o banco
│   │   └── seed.js           # dados fictícios para teste
│   └── modules/
│       ├── patients/
│       │   ├── patients.routes.js
│       │   ├── patients.controller.js
│       │   └── patients.repository.js
│       └── attendances/
│           ├── attendances.routes.js
│           ├── attendances.controller.js
│           └── attendances.repository.js
├── database.db               # banco de dados SQLite
├── package.json
└── server.js
```

---

## 🧠 Decisões do projeto

- **SQLite** foi escolhido por ser simples, sem necessidade de instalação de servidor externo.
- A arquitetura em **módulos** (routes → controller → repository) separa as responsabilidades de forma clara.
- O arquivo **seed.js** permite que qualquer pessoa teste a aplicação com dados prontos em um único comando.
- A rota de **resumo** foi criada pensando especificamente na necessidade da cuidadora de responder familiares rapidamente.
