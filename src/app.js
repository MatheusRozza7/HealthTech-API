// Aqui registramos todas as rotas da aplicação.

const express = require("express");
const app = express();

app.use(express.json());

const pacientesRoutes = require("./modules/patients/patients.routes");
const atendimentosRoutes = require("./modules/attendances/attendances.routes");

app.use("/pacientes", pacientesRoutes);
app.use("/atendimentos", atendimentosRoutes);

module.exports = app;
