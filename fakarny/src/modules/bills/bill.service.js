const dataSource = require("../../database/data-source");
const Bill = require("../../entities/Bill.entity");
const AppError = require("../../utils/AppError");

const billRepository = dataSource.getRepository(Bill);

async function createBill(userId, billData) {
  const bill = billRepository.create({
    ...billData,
    user: { id: userId },
  });

  return await billRepository.save(bill);
}

async function getMyBills(userId) {
  return await billRepository.find({
    where: { user: { id: userId } },
    order: { dueDate: "ASC" },
  });
}

async function updateBill(userId, billId, updateData) {
  const bill = await billRepository.findOne({
    where: { id: billId, user: { id: userId } },
  });

  if (!bill) {
    throw new AppError("Bill not found", 404);
  }

  Object.assign(bill, updateData);
  return await billRepository.save(bill);
}

async function deleteBill(userId, billId) {
  const bill = await billRepository.findOne({
    where: { id: billId, user: { id: userId } },
  });

  if (!bill) {
    throw new AppError("Bill not found", 404);
  }

  await billRepository.remove(bill);
}

module.exports = {
  createBill,
  getMyBills,
  updateBill,
  deleteBill,
};
