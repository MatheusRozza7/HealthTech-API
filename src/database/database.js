const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.resolve(__dirname, "../../database.db"));

// Criamos as tabelas
db.exec(`
  CREATE TABLE IF NOT EXISTS pacientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    idade INTEGER NOT NULL,
    condicoes TEXT,
    contato_familiar TEXT,
    observacoes_gerais TEXT,
    criado_em TEXT DEFAULT (datetime('now', 'localtime'))
  );

  CREATE TABLE IF NOT EXISTS atendimentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    paciente_id INTEGER NOT NULL,
    data TEXT NOT NULL,
    atividades TEXT,
    observacoes TEXT,
    medicamentos TEXT,
    criado_em TEXT DEFAULT (datetime('now', 'localtime')),
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id)
  );
`);

module.exports = db;
