import express from "express";
import UserController from "../controller/UserController";
import ProductController from "../controller/ProductController";
let router = express.Router();

let initWebRouter = (app) => {
  //user
  router.post("/api/register", UserController.register);
  router.post("/api/login", UserController.login);
  router.get("/api/get-all-users", UserController.getAllUsers);
  router.post("/api/create-user", UserController.createUser);
  router.get("/api/get-all-code", UserController.getAllCode);
  router.put("/api/edit-user", UserController.editUser);
  router.delete("/api/delete-user", UserController.deleteUser);

  //product
  router.post("/api/create-product", ProductController.createProduct);
  router.get("/api/get-all-product", ProductController.getAllProduct);
  router.put("/api/edit-product", ProductController.editProduct);
  router.delete("/api/delete-product", ProductController.deleteProduct);
  return app.use("/", router);
};

module.exports = initWebRouter;
