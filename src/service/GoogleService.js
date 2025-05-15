import db from "../models"

let googleAuth = (email, name) =>{
    return new Promise(async(resolve, reject) =>{
        try {
            let user =await db.User.findOne({
                where:{email: email}
            })
            if(!user){
                await db.User.create({
                    email: email,
                    lastName: name,
                })
                let userAfterCreate = await db.User.findOne({
                    where:{email: email}
                })
                resolve({
                    errCode: 1,
                    message: "create user success",
                    user: userAfterCreate
                })
            }else{
                resolve({
                    errCode: 0,
                    message: "User found",
                    user: user
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

export default{
    googleAuth
}