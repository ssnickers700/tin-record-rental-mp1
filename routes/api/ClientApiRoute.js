const express = require("express");
const router = express.Router();
const isAuth = require("../../middleware/isAuth")

const clientApiController = require("../../api/ClientAPI");

router.get("/", clientApiController.getClients);
router.get("/:clientId", clientApiController.getClientById);
router.post("/", isAuth, clientApiController.createClient);
router.put("/:clientId", isAuth, clientApiController.updateClient);
router.delete("/:clientId", isAuth, clientApiController.deleteClient);

module.exports = router;