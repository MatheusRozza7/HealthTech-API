const { Router } = require("express");
const controller = require("./attendances.controller");

const router = Router();

router.post("/", controller.registrar);
router.get("/:id", controller.detalhe);

module.exports = router;
