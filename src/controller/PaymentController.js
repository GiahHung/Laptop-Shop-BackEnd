import axios from "axios";
import dayjs from "dayjs";
import CryptoJS from "crypto-js";
import PaymentService from "../service/PaymentService";
const qs = require("qs");

const config = {
  app_id: "2553",
  key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
  key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
  endpoint: "https://sb-openapi.zalopay.vn/v2/create",
};

let payment = async (req, res) => {
  const currentDay = dayjs();
  const transID = currentDay.format("YYMMDD");
  const app_trans_id = `${transID}_${Math.floor(Math.random() * 1000000)}`;
  const { amount,redirecturl } = req.body;
  const embed_data = {redirecturl};
  const items = [];
  const order = {
    app_id: config.app_id,
    app_trans_id: app_trans_id,
    app_user: "user123",
    amount,
    app_time: Date.now(),
    item: JSON.stringify(items),
    embed_data: JSON.stringify(embed_data),
    bank_code: "zalopayapp",
    description: `ZaloPayDemo - Thanh toán đơn hàng #${app_trans_id}`,
    key1: config.key1,
    mac: "",
  };

  const data =
    config.app_id +
    "|" +
    order.app_trans_id +
    "|" +
    order.app_user +
    "|" +
    order.amount +
    "|" +
    order.app_time +
    "|" +
    order.embed_data +
    "|" +
    order.item;
  order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
  console.log(order);
  try {
    const response = await axios.post(config.endpoint, null, { params: order });
    res.status(200).json({ message: response.data, tran_id: order.app_trans_id });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};

let saveOrder = async (req, res) => {
  try {
    const inputData = req.body;
    let message = await PaymentService.saveOrder(inputData);
    return res.status(200).json(message);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from sever!!!",
    });
  }
};

let checkStatusPayment = async (req, res) => {
  const app_trans_id = req.query.trans;
  let postData = {
    app_id: config.app_id,
    app_trans_id: app_trans_id, // Input your app_trans_id
  };

  let data = postData.app_id + "|" + postData.app_trans_id + "|" + config.key1; // appid|app_trans_id|key1
  postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  let postConfig = {
    method: "post",
    url: "https://sb-openapi.zalopay.vn/v2/query",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: qs.stringify(postData),
  };

  try {
    const response = await axios(postConfig);
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errCode: -1, errMessage: "error from sever" });
  }
};

let saveDetailOrder = async (req,res) =>{
  try {
    const orderID = req.query.orderId;
    const inputData = req.body;
    let message = await PaymentService.saveDetailOrder(orderID,inputData);
    return res.status(200).json(message);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from sever!!!",
    });
  }
 };


export default {
  payment: payment,
  saveOrder: saveOrder,
  checkStatusPayment: checkStatusPayment,
  saveDetailOrder:saveDetailOrder
};
