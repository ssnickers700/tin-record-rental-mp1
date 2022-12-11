const express = require("express");
const router = express.Router();
const recordController = require("../controllers/recordController");

router.get("/", recordController.showRecordList);
router.get("/add", recordController.showAddRecordForm);
router.get("/edit/:recordId", recordController.showEditRecordForm);
router.get("/details/:recordId", recordController.showRecordDetails); 

router.post("/add", recordController.addRecord);
router.post("/edit", recordController.editRecord);
router.get("/delete/:recordId", recordController.deleteRecord);

module.exports = router;