import { includes } from "lodash";
import db from "../models";
require("dotenv").config();

let getOrder = (page, limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let offset = (page - 1) * limit;
      let { count, rows } = await db.Order.findAndCountAll({
        include: [
          {
            model: db.AllCode,
            as: "paymentData",
            attributes: ["value"],
          },
          {
            model: db.AllCode,
            as: "statusDt",
            attributes: ["value"],
          },
        ],
        order: [["id", "DESC"]],
        raw: true,
        offset: offset,
        limit: limit,
      });
      let totalPage = Math.ceil(count / limit);
      resolve({
        errCode: 0,
        errMessage: "Success!!!",
        total: count,
        totalPage: totalPage,
        order: rows,
      });
    } catch (e) {
      console.error("SQL Error:", e);
      reject(e);
    }
  });
};

let getTransaction = (orderID) => {
  return new Promise(async (resolve, reject) => {
    try {
      let transaction = await db.Transaction.findAll({
        where: {
          orderId: orderID,
        },
        include: [
          {
            model: db.Product,
            attributes: ["title"],
          },
        ],
        raw: true,
      });
      resolve({
        errCode: 0,
        errMessage: "Success!!!",
        transaction: transaction,
      });
    } catch (e) {
      console.error("SQL Error:", e);
      reject(e);
    }
  });
};

let updateStatus = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing parameter",
        });
      }
      let order = await db.Order.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (order) {
        order.statusId = data.statusId;

        await order.save();
        resolve({
          errCode: 0,
          errMessage: "Success!!!!",
        });
      }
    } catch (e) {
      console.error("SQL Error:", e);
      reject(e);
    }
  });
};

export default { getOrder, getTransaction, updateStatus };
