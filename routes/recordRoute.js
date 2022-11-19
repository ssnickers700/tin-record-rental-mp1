const express = require("express");
const router = express.Router();
const recordController = require("../controllers/recordController");

router.get("/", recordController.showRecordList);
router.get("/add", recordController.showAddRecordForm);
router.get("/edit", recordController.showEditRecordForm);
router.get("/details/:id", recordController.showRecordDetails);

module.exports = router;