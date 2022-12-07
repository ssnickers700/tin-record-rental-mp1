const express = require("express");
const router = express.Router();

const clientApiController = require("../../api/RecordAPI");

router.get("/", recordApiController.getRecords);
router.get("/:recordId", recordApiController.getRecordById);
router.post("/", recordApiController.createRecord);
router.put("/:recordId", recordApiController.updateRecord);
router.delete("/:recordId", recordApiController.deleteRecord);

module.exports = router;