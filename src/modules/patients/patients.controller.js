// O controller recebe a requisição, chama o repository e devolve a resposta.

const repository = require("./patients.repository"); // ✅ correto

function listar(req, res) {
  const pacientes = repository.listarTodos();
  return res.json(pacientes);
}

function cadastrar(req, res) {
  const { nome, idade, condicoes, contato_familiar, observacoes_gerais } =
    req.body;

  if (!nome || !idade) {
    return res.status(400).json({ erro: "Nome e idade são obrigatórios." });
  }

  const resultado = repository.cadastrar({
    nome,
    idade,
    condicoes,
    contato_familiar,
    observacoes_gerais,
  });
  return res.status(201).json({
    mensagem: "Paciente cadastrado com sucesso.",
    id: resultado.lastInsertRowid,
  });
}

function historico(req, res) {
  const paciente = repository.buscarPorId(req.params.id);

  if (!paciente) {
    return res.status(404).json({ erro: "Paciente não encontrado." });
  }

  const atendimentos = repository.historico(req.params.id);
  return res.json({ paciente, atendimentos });
}

function resumo(req, res) {
  const paciente = repository.buscarPorId(req.params.id);

  if (!paciente) {
    return res.status(404).json({ erro: "Paciente não encontrado." });
  }

  const ultimos = repository.resumoRecente(req.params.id, 5);
  return res.json({ paciente, ultimos_atendimentos: ultimos });
}

module.exports = { listar, cadastrar, historico, resumo };
