
import Address from "../models/address.js";

// Add address : api/address/add 



export const addAddress = async (req, res)=>{
    try {
        const {address, userId} = req.body ;
        console.log('address => ', address)
        await Address.create({...address, userId})
        res.json({success : true , message : 'address added successfully' , addAddress})
    } catch (error) {
        console.log('add address error ->',error.message)
         res.json({success : false , message : error.message })
    
    }
}

// Get address : api/address/get

export const getAddress = async (req, res)=>{
    try {
        const userId = req.userId ;
        
     const address =   await Address.find({userId})
        res.json({success : true , message : 'address get successfully' , address})
    } catch (error) {
        console.log('get address error ->',error.message)
         res.json({success : false , message : error.message })
    
    }
}