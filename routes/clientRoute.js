const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");

router.get("/", clientController.showClientList);
router.get("/add", clientController.showAddClientForm);
router.get("/edit", clientController.showEditClientForm);
router.get("/details/:id", clientController.showClientDetails);

module.exports = router;