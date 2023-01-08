const express = require("express");
const router = express.Router();
const isAuth = require("../../middleware/isAuth")


const rentalApiController = require("../../api/RentalAPI");

router.get("/", rentalApiController.getRentals);
router.get("/:rentalId", rentalApiController.getRentalById);
router.post("/", isAuth, rentalApiController.createRental);
router.put("/:rentalId", isAuth, rentalApiController.updateRental);
router.delete("/:rentalId", isAuth, rentalApiController.deleteRental);

module.exports = router;