const express = require("express");
const router = express.Router();
const rentalController = require("../controllers/rentalController");

router.get("/", rentalController.showRentalList);
router.get("/add", rentalController.showAddRentalForm);
router.get("/edit", rentalController.showEditRentalForm);
router.get("/details/:id", rentalController.showRentalDetails);

module.exports = router;