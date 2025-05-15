import OrderService from "../service/OrderService";

let getOder = async (req, res) => {
  try {
    let page = req.query.page;
    let limit = req.query.limit;
    if (!page || !limit) {
      return res.status(200).json({
        errCode: 3,
        errMessage: "Invalid data",
      });
    }
    let response = await OrderService.getOrder(+page, +limit);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getTransaction = async (req, res) => {
  try {
    let id = req.query.orderId;
    if (!id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Invalid data",
      });
    }
    let response = await OrderService.getTransaction(id);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let updateStatus = async (req, res) => {
  try {
    let data = req.body;
    let response = await OrderService.updateStatus(data);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

export default { getOder, getTransaction, updateStatus };
