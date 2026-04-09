// Este é o arquivo que inicia o servidor.
// Rode: npm run dev

const app = require("./src/app");

require("./src/database/database"); // garante que o banco e as tabelas são criados

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Database rodando em http://localhost:${PORT}`);
});
