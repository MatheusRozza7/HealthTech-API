// Aqui definimos quais URLs existem e qual função do controller cada uma chama.

const { Router } = require("express");
const controller = require("./patients.controller");

const router = Router();

router.get("/", controller.listar);
router.post("/", controller.cadastrar);
router.get("/:id/historico", controller.historico);
router.get("/:id/resumo", controller.resumo);

module.exports = router;
