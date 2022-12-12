const express = require("express");
const router = express.Router();
const rentalController = require("../controllers/rentalController");

router.get("/", rentalController.showRentalList);
router.get("/add", rentalController.showAddRentalForm);
router.get("/edit/:rentalId", rentalController.showEditRentalForm);
router.get("/details/:rentalId", rentalController.showRentalDetails);

router.post("/add", rentalController.addRental);
router.post("/edit", rentalController.editRental);
router.get("/delete/:rentalId", rentalController.deleteRental);

module.exports = router;