const db = require("./database");

// Limpa tudo e reseta os IDs
db.exec(`
  DELETE FROM atendimentos;
  DELETE FROM pacientes;
  DELETE FROM sqlite_sequence WHERE name='atendimentos';
  DELETE FROM sqlite_sequence WHERE name='pacientes';
`);

const inserirPaciente = db.prepare(`
  INSERT INTO pacientes (nome, idade, condicoes, contato_familiar, observacoes_gerais)
  VALUES (@nome, @idade, @condicoes, @contato_familiar, @observacoes_gerais)
`);

const p1 = inserirPaciente.run({
  nome: "Maria Aparecida",
  idade: 78,
  condicoes: "Hipertensão, diabetes tipo 2",
  contato_familiar: "Filha Ana Paula - (21) 99999-1234",
  observacoes_gerais: "Prefere banho pela manhã, toma medicação às 8h e 20h",
});

const p2 = inserirPaciente.run({
  nome: "José Carlos",
  idade: 82,
  condicoes: "Alzheimer leve, hipertensão",
  contato_familiar: "Filho Roberto - (21) 98888-5678",
  observacoes_gerais:
    "Precisa de supervisão constante. Toma medicação às 7h e 19h.",
});

const p3 = inserirPaciente.run({
  nome: "Tereza Cristina",
  idade: 71,
  condicoes: "Artrite reumatoide, depressão leve",
  contato_familiar: "Neta Camila - (21) 97777-9012",
  observacoes_gerais: "Gosta de conversar. Fisioterapia às terças e quintas.",
});

const inserirAtendimento = db.prepare(`
  INSERT INTO atendimentos (paciente_id, data, atividades, observacoes, medicamentos)
  VALUES (@paciente_id, @data, @atividades, @observacoes, @medicamentos)
`);

inserirAtendimento.run({
  paciente_id: p1.lastInsertRowid,
  data: "2025-04-06",
  atividades: "Banho, curativo no joelho, caminhada leve",
  observacoes: "Paciente relatou dor leve nas costas. Humor tranquilo.",
  medicamentos: "Losartana 50mg às 8h, Metformina 500mg às 20h",
});

inserirAtendimento.run({
  paciente_id: p1.lastInsertRowid,
  data: "2025-04-07",
  atividades: "Banho, alongamento, leitura assistida",
  observacoes: "Bem disposta. Sem queixas.",
  medicamentos: "Losartana 50mg às 8h, Metformina 500mg às 20h",
});

inserirAtendimento.run({
  paciente_id: p2.lastInsertRowid,
  data: "2025-04-06",
  atividades: "Banho, refeições assistidas, passeio no jardim",
  observacoes: "Episódio de confusão leve no período da tarde.",
  medicamentos: "Donepezila 5mg às 7h, Losartana 25mg às 19h",
});

inserirAtendimento.run({
  paciente_id: p3.lastInsertRowid,
  data: "2025-04-07",
  atividades: "Fisioterapia, banho, conversa e jogos de memória",
  observacoes: "Humor mais animado que na semana anterior.",
  medicamentos: "Metotrexato semanal, Amitriptilina 25mg às 21h",
});

console.log("✅ Seed concluído! 3 pacientes e 4 atendimentos inseridos.");
