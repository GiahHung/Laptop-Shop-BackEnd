"use strict";

var _express = _interopRequireDefault(require("express"));
var _UserController = _interopRequireDefault(require("../controller/UserController"));
var _ProductController = _interopRequireDefault(require("../controller/ProductController"));
var _CartController = _interopRequireDefault(require("../controller/CartController"));
var _PaymentController = _interopRequireDefault(require("../controller/PaymentController"));
var _OrderController = _interopRequireDefault(require("../controller/OrderController"));
var _GoogleController = _interopRequireDefault(require("../controller/GoogleController"));
var _MailController = _interopRequireDefault(require("../controller/MailController"));
var _ValidateToken = _interopRequireDefault(require("../middleware/ValidateToken"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
var initWebRouter = function initWebRouter(app) {
  //user
  router.post("/api/register", _UserController["default"].register);
  router.post("/api/login", _UserController["default"].login);
  router.get("/api/get-all-users", _ValidateToken["default"], _UserController["default"].getAllUsers);
  router.post("/api/create-user", _ValidateToken["default"], _UserController["default"].createUser);
  router.get("/api/get-all-code", _UserController["default"].getAllCode);
  router.put("/api/edit-user", _ValidateToken["default"], _UserController["default"].editUser);
  router["delete"]("/api/delete-user", _ValidateToken["default"], _UserController["default"].deleteUser);
  router.get("/api/get-user-order", _ValidateToken["default"], _UserController["default"].getUserOrder);
  router.get("/api/get-all-product-category", _UserController["default"].getAllProductByCategory);

  //product
  router.post("/api/create-product", _ValidateToken["default"], _ProductController["default"].createProduct);
  router.get("/api/get-all-product", _ProductController["default"].getAllProduct);
  router.get("/api/get-top-product", _ProductController["default"].getTopProduct);
  router.put("/api/edit-product", _ValidateToken["default"], _ProductController["default"].editProduct);
  router["delete"]("/api/delete-product", _ValidateToken["default"], _ProductController["default"].deleteProduct);

  //cart
  router.get("/api/get-cart", _CartController["default"].getCart);
  router.post("/api/add-product-to-cart", _CartController["default"].addProductToCart);
  router["delete"]("/api/delete-product-in-cart", _CartController["default"].deleteProductInCart);
  router.post("/api/get-async-cart", _CartController["default"].asyncCart);
  router.put("/api/increase-quantity", _CartController["default"].increaseQuantity);
  router.put("/api/decrease-quantity", _CartController["default"].decreaseQuantity);

  // payment
  router.post("/api/payment", _PaymentController["default"].payment);
  router.post("/api/save-order", _PaymentController["default"].saveOrder);
  router.post("/api/save-detail-order", _PaymentController["default"].saveDetailOrder);
  router.post("/api/check-status-payment", _PaymentController["default"].checkStatusPayment);

  //revenue
  router.get("/api/get-revenue", _ValidateToken["default"], _ProductController["default"].getRevenue);
  router.get("/api/get-amount-order", _ValidateToken["default"], _ProductController["default"].getAmountOrder);
  router.get("/api/get-order-not-confirm", _ValidateToken["default"], _ProductController["default"].getAmountOrderNotConfirm);
  router.get("/api/get-revenue-by-date", _ValidateToken["default"], _ProductController["default"].getRevenueToday);

  // order
  router.get("/api/get-order", _OrderController["default"].getOder);
  router.get("/api/get-transaction", _ValidateToken["default"], _OrderController["default"].getTransaction);
  router.put("/api/update-status", _ValidateToken["default"], _OrderController["default"].updateStatus);

  //google
  router.post("/api/google-login", _GoogleController["default"].googleAuth);

  //mail
  router.post("/api/send-email", _ValidateToken["default"], _MailController["default"].sendMail);
  return app.use("/", router);
};
module.exports = initWebRouter;