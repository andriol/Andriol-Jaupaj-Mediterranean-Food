const router = require("express").Router();
const mediterraneanController = require("../controllers/mediterraneanController");

router.get("/", mediterraneanController.getAllData);

router.get("/:mediterraneanId", mediterraneanController.getIndividual);

router.post("/", mediterraneanController.createMediterranean);

module.exports = router;
