const express = require("express");
const billController = require("./bill.controller");
const protect = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");
const { createBillSchema, updateBillSchema } = require("./bill.schema");

const router = express.Router();

router.use(protect);

router
  .route("/")
  .post(validate(createBillSchema), billController.createBill)
  .get(billController.getMyBills);

router
  .route("/:id")
  .patch(validate(updateBillSchema), billController.updateBill)
  .delete(billController.deleteBill);

module.exports = router;
