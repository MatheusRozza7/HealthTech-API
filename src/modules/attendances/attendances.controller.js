const repository = require("./attendances.repository");
const db = require("../../database/database");

function registrar(req, res) {
  const { paciente_id, data, atividades, observacoes, medicamentos } = req.body;

  if (!paciente_id || !data) {
    return res
      .status(400)
      .json({ erro: "paciente_id e data são obrigatórios." });
  }

  // Verifica se o paciente existe direto no banco, sem importar outro módulo
  const paciente = db
    .prepare("SELECT id FROM pacientes WHERE id = ?")
    .get(paciente_id);
  if (!paciente) {
    return res.status(404).json({ erro: "Paciente não encontrado." });
  }

  const resultado = repository.cadastrar({
    paciente_id,
    data,
    atividades,
    observacoes,
    medicamentos,
  });
  return res
    .status(201)
    .json({
      mensagem: "Atendimento registrado com sucesso.",
      id: resultado.lastInsertRowid,
    });
}

function detalhe(req, res) {
  const atendimento = repository.buscarPorId(req.params.id);

  if (!atendimento) {
    return res.status(404).json({ erro: "Atendimento não encontrado." });
  }

  return res.json(atendimento);
}

module.exports = { registrar, detalhe };
