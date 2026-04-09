const db = require("../../database/database");

function cadastrar(dados) {
  const stmt = db.prepare(`
    INSERT INTO atendimentos (paciente_id, data, atividades, observacoes, medicamentos)
    VALUES (@paciente_id, @data, @atividades, @observacoes, @medicamentos)
  `);
  return stmt.run(dados);
}

function buscarPorId(id) {
  return db.prepare("SELECT * FROM atendimentos WHERE id = ?").get(id);
}

module.exports = { cadastrar, buscarPorId };
