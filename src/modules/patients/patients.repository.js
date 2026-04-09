const db = require("../../database/database");

function listarTodos() {
  return db.prepare("SELECT * FROM pacientes ORDER BY id ASC").all();
}

function buscarPorId(id) {
  return db.prepare("SELECT * FROM pacientes WHERE id = ?").get(id);
}

function cadastrar(dados) {
  const stmt = db.prepare(`
    INSERT INTO pacientes (nome, idade, condicoes, contato_familiar, observacoes_gerais)
    VALUES (@nome, @idade, @condicoes, @contato_familiar, @observacoes_gerais)
  `);
  return stmt.run(dados);
}

function historico(paciente_id) {
  return db
    .prepare(
      `
    SELECT * FROM atendimentos
    WHERE paciente_id = ?
    ORDER BY data DESC
  `,
    )
    .all(paciente_id);
}

function resumoRecente(paciente_id, limite) {
  return db
    .prepare(
      `
    SELECT * FROM atendimentos
    WHERE paciente_id = ?
    ORDER BY data DESC
    LIMIT ?
  `,
    )
    .all(paciente_id, limite);
}

module.exports = {
  listarTodos,
  buscarPorId,
  cadastrar,
  historico,
  resumoRecente,
};
