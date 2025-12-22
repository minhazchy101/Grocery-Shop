import User from "../models/User.js";


export const updateCart = async (req, res)=>{
    console.log('updateCart => ', req.body)
    try {
        const { cartItems} = req.body ;
        const userId = req.userId;
     const items =  await User.findByIdAndUpdate(userId, {cartItems})
     if(items){
       return  res.json({success : true, message : "Cart Updated"})

     }

    } catch (error) {
       console.log(`cart update error ${error.message}`) 
       res.json({success : false, message : error.message})
    }
}