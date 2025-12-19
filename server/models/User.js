import mongoose from "mongoose";

 const useSchema = new mongoose.Schema({
    name : {type : String, require : true},
    email : {type : String, require : true},
    password : {type : String, require : true},
    cartItems : {type : Object, default: {}},
 },{minimize : false})

 const User = mongoose.models.users || mongoose.model('user', useSchema)

 export default User ;