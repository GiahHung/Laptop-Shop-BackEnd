import { raw } from "body-parser";
import db from "../models/index";
import { DATEONLY, where } from "sequelize";
import { response } from "express";
import { promiseImpl } from "ejs";
import { Op } from "sequelize";
import { DELETE } from "sequelize/lib/query-types";
require("dotenv").config();

let createProductService = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Product.create({
        title: inputData.title,
        price: inputData.price,
        discount: inputData.discount,
        categoryId: inputData.categoryId,
        hotId: inputData.hotId,
        brandId: inputData.brandId,
        statusId: inputData.statusId,
        mouseCategory: inputData.mouseCategory,
        image: inputData.image,
      });

      resolve({
        errCode: 0,
        errMessage: "create success!!!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getAllPageProductService = (page, limit, categoryId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let offset = (page - 1) * limit;
      let { count, rows } = await db.Product.findAndCountAll({
        where: { categoryId: categoryId },
        include: [
          {
            model: db.AllCode,
            as: "brandData",
            attributes: ["value"],
          },
          {
            model: db.AllCode,
            as: "statusData",
            attributes: ["value"],
          },
        ],
        order: [["id", "DESC"]],
        offset: offset,
        limit: limit,
      });
      let totalPage = Math.ceil(count / limit);

      resolve({
        errCode: 0,
        errMessage: "Success!!!",
        total: count,
        totalPage: totalPage,
        product: rows,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getAllProduct = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = "";
      product = await db.Product.findAll({});
      resolve(product);
    } catch (e) {
      reject(e);
    }
  });
};

let editProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing parameter",
        });
      }
      let product = await db.Product.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (product) {
        product.title = data.title;
        product.hotId = data.hotId;
        product.price = data.price;
        product.discount = data.discount;
        product.categoryId = data.categoryId;
        product.statusId = data.statusId;
        product.brandId = data.brandId;
        product.mouseCategory = data.mouseCategory;
        if (data.image) {
          product.image = data.image;
        }
        await product.save();
        resolve({
          errCode: 0,
          errMessage: "Success!!!!",
        });
      } else {
        resolve({
          errCode: 3,
          errMessage: "id isnt exist",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteProduct = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let foundUser = await db.Product.findOne({
        where: { id: productId },
      });
      if (!foundUser) {
        resolve({
          errCode: 2,
          message: "can not find product",
        });
      }
      await db.Product.destroy({
        where: { id: productId },
      });
      resolve({
        errCode: 0,
        message: "delete success!!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getTopProduct = (limitInput, categoryId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = await db.Product.findAll({
        limit: limitInput,
        where: { categoryId: categoryId },
      });
      resolve({
        errCode: 0,
        data: products,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getRevenue = (time) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Helper function to calculate start and end times
      const calculateStartAndEnd = (time) => {
        let start, end;

        // Start and End of Today
        if (time === "re1") {
          start = new Date();
          start.setHours(0, 0, 0, 0);

          end = new Date();
          end.setHours(23, 59, 59, 999);
        }

        // Start and End of the Week
        if (time === "re2") {
          start = new Date();
          start.setDate(start.getDate() - start.getDay()); // Adjust to Sunday (start of week)
          start.setHours(0, 0, 0, 0);

          end = new Date(start);
          end.setDate(end.getDate() + 6); // Adjust to Saturday (end of week)
          end.setHours(23, 59, 59, 999);
        }

        // Start and End of the Month
        if (time === "re3") {
          start = new Date();
          start.setDate(1); // First day of the month
          start.setHours(0, 0, 0, 0);

          end = new Date(start);
          end.setMonth(end.getMonth() + 1); // Move to next month
          end.setDate(0); // Last day of the current month
          end.setHours(23, 59, 59, 999);
        }

        // Start and End of the Year
        if (time === "re4") {
          start = new Date();
          start.setMonth(0, 1); // January 1st
          start.setHours(0, 0, 0, 0);

          end = new Date(start);
          end.setFullYear(end.getFullYear() + 1); // Move to next year
          end.setDate(0); // Last day of the current year
          end.setHours(23, 59, 59, 999);
        }

        return { start, end };
      };

      // Calculate start and end based on the provided time
      const { start, end } = calculateStartAndEnd(time);

      // Fetch revenue from the database
      let revenue = await db.Order.findAll({
        where: {
          createdAt: {
            [Op.gte]: start,
            [Op.lt]: end,
          },
        },
        attributes: [
          "paymentId",
          [
            db.sequelize.fn("SUM", db.sequelize.col("totalPrice")),
            "totalRevenue",
          ],
        ],
        include: [
          {
            model: db.AllCode,
            as: "paymentData",
            attributes: ["value"],
          },
        ],
        group: ["paymentId", "paymentData.value"],
        raw: true,
      });

      // Resolve with the fetched revenue
      resolve({
        errCode: 0,
        errMessage: "Success",
        data: revenue,
      });
    } catch (e) {
      console.error("Error fetching revenue:", e); // Log the error for debugging
      reject({
        errCode: 1,
        errMessage: "Error fetching revenue",
        error: e,
      });
    }
  });
};

let getAmountOrder = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0); // Set time to 00:00:00.000

      let endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      let amountOrder = await db.Order.count({
        where: {
          createdAt: {
            [Op.gte]: startOfDay,
            [Op.lt]: endOfDay,
          },
        },
      });
      resolve({
        errCode: 0,
        errMessage: "Success",
        data: amountOrder,
      });
    } catch (e) {
      console.error("Error fetching amount order:", e); // Log the error for debugging
      reject({
        errCode: 1,
        errMessage: "Error fetching amount order",
        error: e,
      });
    }
  });
};

let getAmountOrderNotConfirm = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let amountOrderNotConfirm = await db.Order.count({
        where: { statusId: "s1" },
      });
      resolve({
        errCode: 0,
        errMessage: "Success",
        data: amountOrderNotConfirm,
      });
    } catch (e) {
      console.error("Error fetching amount order not confirm:", e); // Log the error for debugging
      reject({
        errCode: 1,
        errMessage: "Error fetching amount order not confirm",
        error: e,
      });
    }
  });
};

let getRevenueToday = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      let endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      // Query the database for today's revenue
      let revenueToday = await db.Order.sum("totalPrice", {
        where: {
          createdAt: {
            [Op.gte]: startOfDay,
            [Op.lt]: endOfDay,
          },
        },
      });

      resolve({
        errCode: 0,
        errMessage: "Success",
        data: revenueToday || 0, // Ensure it returns 0 if no records are found
      });
    } catch (e) {
      console.error("Error fetching revenue today:", e); // Log the error for debugging
      reject({
        errCode: 1,
        errMessage: "Error fetching revenue today",
        error: e,
      });
    }
  });
};

export default {
  createProductService,
  getAllProduct,
  editProduct,
  deleteProduct,
  getAllPageProductService,
  getTopProduct,
  getRevenue,
  getAmountOrder,
  getAmountOrderNotConfirm,
  getRevenueToday,
};
