import db from "../models";
let saveOrder = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let id = await db.Order.create({
        userId: inputData.userId,
        fullName: inputData.name,
        email: inputData.email,
        phoneNumber: inputData.phoneNumber,
        address: inputData.address,
        statusId: "s1",
        note: inputData.note,
        paymentId: inputData.paymentId,
        totalPrice: inputData.amount,
      });
      resolve({
        errCode: 0,
        errMessage: "success",
        data: id,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let saveDetailOrder = (orderId, inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let order = await db.Order.findAll({
        where: { id: orderId },
      });
      if (!order) {
        resolve({
          errCode: 2,
          errMessage: "order not found",
        });
      } else {
        const newCartItems = inputData.map((item) => ({
          orderId: orderId,
          productId: item.productId,
          quantity: item.quantity,
          totalPrice: item.totalPrice,
        }));
        if (newCartItems.length > 0) {
          await db.Transaction.bulkCreate(newCartItems);
        }
        resolve({
          errCode: 0,
          errMessage: "success",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  saveOrder,
  saveDetailOrder,
};
