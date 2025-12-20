import {v2 as cloudinary}  from 'cloudinary'
import Product from '../models/Products.js'


//  Add Products : api/products/add
export const addProducts = async (req, res)=>{
try {
    let productData = JSON.parse(req.body.productData)
    const images = req.files 

    let imagesURL = await Promise.all(
        images.map(async (item)=>{
            let result = await cloudinary.uploader.upload(item.path, {resource_type : 'image'});
            return result.secure_url
        })
    )
    await Product.create({...productData, image : imagesURL}) 

    res.json({success : true, message : 'Product added successfully', productData})
} catch (error) {
       console.log('Add Products Error -> ', error.message)
        return res.json({success : false, message : error.message})
}
}
//  Get Products : api/products/lists
export const productsLists = async (req, res)=>{
    try {
        const products = await Product.find({})
           res.json({success : true, products})

    } catch (error) {
        console.log('Add Products list -> ', error.message)
        return res.json({success : false, message : error.message})
}
}
//  Get single Products : api/product/id
export const productById = async (req, res)=>{
        try {
            const {id} = res.body
            const product = await Product.findById(id)
        res.json({success : true, product})

    } catch (error) {
        console.log('Add Product byId -> ', error.message)
        return res.json({success : false, message : error.message})
}
}

//  change Products Stock  : api/products/stock
export const changeStock = async (req, res)=>{
try {
      const {id,inStock} = res.body; 
      await Product.findByIdAndUpdate(id, {inStock})
       res.json({success : true, message : "Stock updated"})

    } catch (error) {
        console.log('In Stock error -> ', error.message)
        return res.json({success : false, message : error.message})
}
}