import { includes } from "lodash";
import db from "../models";
require("dotenv").config();
let getCart = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId) {
        resolve({
          errCode: 3,
          errMessage: "User id is required",
        });
        return;
      }
      let data = await db.Cart.findAll({
        where: { userId: userId },
        include: [{ model: db.Product, attributes: ["title", "image"] }],
      });
      if (data) {
        resolve({
          errCode: 0,
          errMessage: "Success",
          data: data,
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "Cart not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let addProductToCart = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { productId, userId, price, quantity = 1 } = inputData;
      let product = await db.Cart.findOne({
        where: { productId: productId, userId: userId },
      });

      if (!product) {
        await db.Cart.create({
          userId: userId,
          productId: productId,
          price: price,
          quantity: quantity,
          totalPrice: price * quantity, // Correct total price calculation
        });

        resolve({
          errCode: 0,
          errMessage: "Product added to cart successfully",
        });
      } else {
        // Product already in cart, update quantity and total price
        product.quantity += quantity; // Increase the quantity by the provided amount
        product.totalPrice = product.quantity * product.price; // Update the total price

        await product.save(); // Save the updated product in the cart
        resolve({
          errCode: 0,
          errMessage: "Cart updated successfully",
        });
      }
    } catch (e) {
      reject({
        errCode: 1,
        errMessage: "Error while adding product to cart",
        error: e.message,
      });
    }
  });
};

let increaseQuantity = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputData.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let product = await db.Cart.findOne({
          where: { id: inputData.id },
        });
        if (product) {
          product.quantity += 1;
          product.totalPrice += inputData.price;
          await product.save();
          resolve({
            errCode: 0,
            errMessage: "success",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Product not found",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

const decreaseQuantity = async (inputData) => {
  try {
    if (!inputData.id) {
      return {
        errCode: 1,
        errMessage: "Missing parameter: id",
      };
    }

    let product = await db.Cart.findOne({ where: { id: inputData.id } });

    if (!product) {
      return {
        errCode: 2,
        errMessage: "Product not found",
      };
    }

    if (product.quantity > 1) {
      product.quantity -= 1;
      product.totalPrice -= inputData.price;
      await product.save();
      return {
        errCode: 0,
        errMessage: "Quantity decreased successfully",
      };
    } else {
      await deleteProductInCart(inputData.id);
      return {
        errCode: 0,
        errMessage: "Product removed from cart as quantity reached zero",
      };
    }
  } catch (error) {
    console.error("Error in decreaseQuantity:", error);
    return {
      errCode: 500,
      errMessage: "Internal server error",
    };
  }
};

let deleteProductInCart = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await db.Cart.findOne({
        where: { id: id },
      });
      if (product) {
        await db.Cart.destroy({
          where: { id: id },
        });
        resolve({
          errCode: 0,
          errMessage: "success",
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: "Product not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const asyncCart = async (userId, localStorageItems) => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    if (!Array.isArray(localStorageItems)) {
      throw new Error("localStorageItems must be an array");
    }

    const existingCart = await db.Cart.findAll({ where: { userId } });

    if (existingCart.length > 0) {
      return {
        errCode: 0,
        errMessage: "Cart fetched successfully",
      };
    } else {
      const newCartItems = localStorageItems.map((item) => ({
        userId,
        productId: item.id,
        price: item.discount,
        quantity: item.quantity || 1,
      }));
      if (newCartItems.length > 0) {
        await db.Cart.bulkCreate(newCartItems);
      }
      return {
        errCode: 0,
        errMessage: "Cart updated successfully",
        data: updatedCart,
      };
    }
  } catch (error) {
    console.error("Error in asyncCart:", error.message);
    return {
      errCode: 1,
      errMessage: "An error occurred while processing the cart",
      error: error.message,
    };
  }
};

export default {
  getCart,
  addProductToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteProductInCart,
  asyncCart,
};
