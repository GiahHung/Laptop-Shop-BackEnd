import { raw } from "body-parser";
import db from "../models/index";
import { where } from "sequelize";
import { response } from "express";
import { promiseImpl } from "ejs";
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
        where:{categoryId: categoryId},
        include: [
          {
            model: db.AllCode,
            as:"brandData",
            attributes: ["value"],
          },
          {
            model: db.AllCode,
            as:"statusData",
            attributes: ["value"],
          }],
        order: [['id', 'DESC']], 
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
        product = await db.Product.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
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
        if(data.image){
          product.image = data.image
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

export default {
  createProductService,
  getAllProduct,
  editProduct,
  deleteProduct,
  getAllPageProductService
};
