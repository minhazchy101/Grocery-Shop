import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId : {type : String, require : true},
    items : [{
        product : {type : String, require : true, ref : 'product'},
        quantity : {type : Number , require : true} 
    }], 
    amount : {type : String, require : true},
    address : {type : String, require : true, ref : 'address'},
    status : {type : String, default : "Order Placed"},
    paymentType : {type : String , require : true}, 
    isPaid : {type : Boolean, require : true}

}, {timestamps : true})

const Order = mongoose.model.order || mongoose.model('order', orderSchema)

export default Order;