import { raw } from "body-parser";
import db from "../models/index";
import bcrypt, { hash } from "bcryptjs";
import { where } from "sequelize";
import jwt from "jsonwebtoken";
import { response } from "express";
import { promiseImpl } from "ejs";
import { DELETE } from "sequelize/lib/query-types";
require("dotenv").config();

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

const checkEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await db.User.findOne({
        where: { email: userEmail },
        raw: false,
      });
      if (check) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let registerService = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputData.email || !inputData.password || !inputData.phoneNumber) {
        resolve({
          errCode: 2,
          errMessage: "Missing parameter input!!!",
        });
      } else {
        let check = await checkEmail(inputData.email);
        if (check == true) {
          resolve({
            errCode: 3,
            errMessage: "Email is already in use",
          });
        } else {
          let hashPasswordFromBcrypt = await hashPassword(inputData.password);
          let user = await db.User.create({
            firstName: inputData.firstName,
            lastName: inputData.lastName,
            phoneNumber: inputData.phoneNumber,
            email: inputData.email,
            password: hashPasswordFromBcrypt,
            roleId: inputData.roleId,
          });
          const token =
            user &&
            jwt.sign({ email: user.email }, process.env.SECRET_JWT, {
              expiresIn: "2d",
            });
          resolve({
            errCode: 0,
            errMessage: "Register success!!!",
            token: token || null,
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let loginService = (email, password) => {
  return new Promise(async (resolve, reject) => {
    let userData = {};
    let isExist = await checkEmail(email);
    try {
      if (!email || !password) {
        resolve({ errCode: 5, errMessage: "Missing parameter " });
      } else {
        if (isExist) {
          let user = await db.User.findOne({
            attributes: [
              "email",
              "password",
              "firstName",
              "lastName",
              "roleId",
            ],
            where: { email: email },
            raw: true,
          });
          if (user) {
            let check = bcrypt.compareSync(password, user.password);
            let isCorrect = user && check;
            const token =
              isCorrect &&
              jwt.sign({ email: user.email }, process.env.SECRET_JWT, {
                expiresIn: "2d",
              });
            if (check) {
              userData.errCode = 0;
              userData.errMessage = `Ok`;
              userData.token = token;
              delete user.password;
              userData.user = user;
            } else {
              userData.errCode = 3;
              userData.errMessage = `password wrong`;
            }
          } else {
            userData.errCode = 3;
            userData.errMessage = `User doesnt exist ?`;
          }
        } else {
          userData.errCode = 4;
          userData.errMessage = `Email wrong`;
        }
        resolve(userData);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllPageUsersService = (page, limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let offset = (page - 1) * limit;
      let { count, rows } = await db.User.findAndCountAll({
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
        user: rows,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUsersService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = "";
      user = await db.User.findAll({
        attributes: {
          exclude: ["password"],
        },
      });
      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};

let editUserService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing parameter",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.phoneNumber = data.phoneNumber;
        user.roleId = data.roleId;

        await user.save();
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

let getAllCodeService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({
          errCode: 2,
          errMessage: "Missing parameter",
        });
      } else {
        let res = {};
        let allCode = await db.AllCode.findAll({
          where: { type: typeInput },
        });
        res.errCode = 0;
        res.data = allCode;
        resolve(res);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let createUserService = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkEmail(inputData.email);
      if (check == true) {
        resolve({
          errCode: 3,
          errMessage: "Email is already in use",
        });
      } else {
        let hashPasswordFromBcrypt = await hashPassword(inputData.password);
        let user = await db.User.create({
          firstName: inputData.firstName,
          lastName: inputData.lastName,
          phoneNumber: inputData.phoneNumber,
          email: inputData.email,
          password: hashPasswordFromBcrypt,
          roleId: inputData.roleId,
        });
        const token =
          user &&
          jwt.sign({ email: user.email }, process.env.SECRET_JWT, {
            expiresIn: "2d",
          });
        resolve({
          errCode: 0,
          errMessage: "Register success!!!",
          token: token || null,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let foundUser = await db.User.findOne({
        where: { id: userId },
      });
      if (!foundUser) {
        resolve({
          errCode: 2,
          message: "can not find user",
        });
      }
      await db.User.destroy({
        where: { id: userId },
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

module.exports = {
  registerService: registerService,
  loginService: loginService,
  getAllUsersService: getAllUsersService,
  editUserService: editUserService,
  getAllCodeService: getAllCodeService,
  createUserService: createUserService,
  deleteUser: deleteUser,
  getAllPageUsersService: getAllPageUsersService,
};
