const express = require("express");
const router = express.Router();
const isAuth = require("../../middleware/isAuth")

const recordApiController = require("../../api/RecordAPI");

router.get("/", recordApiController.getRecords);
router.get("/:recordId", recordApiController.getRecordById);
router.post("/", isAuth, recordApiController.createRecord);
router.put("/:recordId", isAuth, recordApiController.updateRecord);
router.delete("/:recordId", isAuth, recordApiController.deleteRecord);

module.exports = router;