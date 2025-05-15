import ProductService from "../service/ProductService";

let createProduct = async (req, res) => {
  try {
    let message = await ProductService.createProductService(req.body);
    console.log(message);
    return res.status(200).json(message);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from sever!!!",
    });
  }
};

let getAllProduct = async (req, res) => {
  try {
    if (req.query.page && req.query.limit && req.query.categoryId) {
      let page = req.query.page;
      let limit = req.query.limit;
      let categoryId = req.query.categoryId;
      let product = await ProductService.getAllPageProductService(
        +page,
        +limit,
        categoryId
      );
      return res.status(200).json({
        errCode: 0,
        errMessage: "Success!!!",
        product,
      });
    } else {
      let product = await ProductService.getAllProduct();
      return res.status(200).json({
        errCode: 0,
        errMessage: "Success!!!",
        product,
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from sever!!!",
    });
  }
};

let editProduct = async (req, res) => {
  try {
    let data = req.body;
    let message = await ProductService.editProduct(data);
    return res.status(200).json(message);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from sever!!!",
    });
  }
};

let deleteProduct = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing required parameter",
    });
  }
  let message = await ProductService.deleteProduct(req.body.id);
  console.log(message);
  return res.status(200).json(message);
};

let getTopProduct = async (req, res) => {
  let limit = req.query.limit;
  let categoryId = req.query.categoryId
  if (!limit) limit = 10;
  try {
    let response = await ProductService.getTopProduct(+limit,categoryId);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getRevenue = async(req,res) =>{

  try {
    let time = req.query.time;
    let response = await ProductService.getRevenue(time);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
}

let getAmountOrder = async(req,res) =>{
  try {
    let response = await ProductService.getAmountOrder();
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
}

let getAmountOrderNotConfirm = async(req,res) =>{
  try {
    let response = await ProductService.getAmountOrderNotConfirm();
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
 }

 let getRevenueToday = async(req,res) =>{
  try {
    let response = await ProductService.getRevenueToday();
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
 }


export default {
  createProduct: createProduct,
  getAllProduct: getAllProduct,
  editProduct: editProduct,
  deleteProduct: deleteProduct,
  getTopProduct: getTopProduct,
  getRevenue:getRevenue,
  getAmountOrder: getAmountOrder,
  getAmountOrderNotConfirm: getAmountOrderNotConfirm,
  getRevenueToday: getRevenueToday,
};
