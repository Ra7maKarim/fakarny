const billService = require("./bill.service");
const asyncHandler = require("../../utils/asyncHandler");

async function createBill(req, res) {
  const bill = await billService.createBill(req.user.id, req.body);

  res.status(201).json({
    success: true,
    message: "Bill created successfully",
    data: bill,
  });
}

async function getMyBills(req, res) {
  const bills = await billService.getMyBills(req.user.id);

  res.status(200).json({
    success: true,
    results: bills.length,
    data: bills,
  });
}

async function updateBill(req, res) {
  const bill = await billService.updateBill(
    req.user.id,
    Number(req.params.id),
    req.body,
  );

  res.status(200).json({
    success: true,
    message: "Bill updated successfully",
    data: bill,
  });
}

async function deleteBill(req, res) {
  await billService.deleteBill(req.user.id, Number(req.params.id));

  res.status(200).json({
    success: true,
    message: "Bill deleted successfully",
  });
}

module.exports = {
  createBill: asyncHandler(createBill),
  getMyBills: asyncHandler(getMyBills),
  updateBill: asyncHandler(updateBill),
  deleteBill: asyncHandler(deleteBill),
};
