import express from "express";
import UserController from "../controller/UserController";
import ProductController from "../controller/ProductController";
import CartController from "../controller/CartController";
import PaymentController from "../controller/PaymentController";
import OrderController from "../controller/OrderController";
import GoogleController from "../controller/GoogleController";
import MailController from "../controller/MailController";
import validateToken from "../middleware/ValidateToken";
let router = express.Router();

let initWebRouter = (app) => {
  //user
  router.post("/api/register", UserController.register);
  router.post("/api/login", UserController.login);
  router.get("/api/get-all-users",validateToken, UserController.getAllUsers);
  router.post("/api/create-user", validateToken,UserController.createUser);
  router.get("/api/get-all-code", UserController.getAllCode);
  router.put("/api/edit-user",validateToken, UserController.editUser);
  router.delete("/api/delete-user", validateToken,UserController.deleteUser);
  router.get("/api/get-user-order", validateToken,UserController.getUserOrder);
  router.get(
    "/api/get-all-product-category",
    UserController.getAllProductByCategory
  );

  //product
  router.post("/api/create-product",validateToken, ProductController.createProduct);
  router.get("/api/get-all-product", ProductController.getAllProduct);
  router.get("/api/get-top-product", ProductController.getTopProduct);
  router.put("/api/edit-product",validateToken, ProductController.editProduct);
  router.delete("/api/delete-product",validateToken, ProductController.deleteProduct);

  //cart
  router.get("/api/get-cart", CartController.getCart);
  router.post("/api/add-product-to-cart", CartController.addProductToCart);
  router.delete(
    "/api/delete-product-in-cart",
    CartController.deleteProductInCart
  );
  router.post("/api/get-async-cart", CartController.asyncCart);
  router.put("/api/increase-quantity", CartController.increaseQuantity);
  router.put("/api/decrease-quantity", CartController.decreaseQuantity);

  // payment
  router.post("/api/payment", PaymentController.payment);
  router.post("/api/save-order", PaymentController.saveOrder);
  router.post("/api/save-detail-order", PaymentController.saveDetailOrder);
  router.post(
    "/api/check-status-payment", PaymentController.checkStatusPayment
  );

  //revenue
  router.get("/api/get-revenue", validateToken,ProductController.getRevenue);
  router.get("/api/get-amount-order",validateToken, ProductController.getAmountOrder);
  router.get(
    "/api/get-order-not-confirm",validateToken,
    ProductController.getAmountOrderNotConfirm
  );
  router.get("/api/get-revenue-by-date",validateToken, ProductController.getRevenueToday);

  // order
  router.get("/api/get-order", OrderController.getOder);
  router.get("/api/get-transaction",validateToken, OrderController.getTransaction);
  router.put("/api/update-status",validateToken, OrderController.updateStatus);

  //google
  router.post("/api/google-login", GoogleController.googleAuth);

  //mail
  router.post("/api/send-email",validateToken, MailController.sendMail);
  return app.use("/", router);
};

module.exports = initWebRouter;
