import CartService from "../service/CartService";

let getCart = async (req,res) =>{
   try {
     let userId = req.query.userId;
    let data = await CartService.getCart(userId);
    return res.status(200).json(data)
   } catch (e) {
    console.log(e);
    return res.status(200).json({
        errCode:-1,
        errMessage:"Error from sever"
    })
   }
}

let addProductToCart = async (req,res)=>{
    try {
        let data = req.body;
        let message = await CartService.addProductToCart(data);
        return res.status(200).json(message)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode:-1,
            errMessage:'error from server'
        })
    }
}

let increaseQuantity = async (req,res)=>{
    try {
        let data = req.body;
        let message = await CartService.increaseQuantity(data);
        return res.status(200).json(message)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode:-1,
            errMessage:'error from server'
        })
    }
 }
 let decreaseQuantity = async (req,res)=>{
    try {
        let data = req.body;
        let message = await CartService.decreaseQuantity(data);
        return res.status(200).json(message)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode:-1,
            errMessage:'error from server'
        })
    }
 }

let deleteProductInCart = async (req,res)=>{
    try {
        let id = req.body.id;
        if(!id){
            return res.status(200).json({
                errCode:1,
                errMessage:'Missing required parameter'
            })
        }else{
            let message = await CartService.deleteProductInCart(id);
            return res.status(200).json(message)
        }
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode:-1,
            errMessage:'error form server'
        })
    }
}

let asyncCart = async (req,res) => {
    try {
        const { userId, localProduct } = req.body;
        let data = await CartService.asyncCart(userId, localProduct);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode:-1,
            errMessage:'error form server'
        })
    }
}

export default{getCart,addProductToCart,increaseQuantity, decreaseQuantity,deleteProductInCart,asyncCart};