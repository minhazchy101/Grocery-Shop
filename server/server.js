import express from 'express'
import cookieParser from "cookie-parser";

import cors from "cors"
import dotenv from "dotenv";
import connectDB from './config/connectdb.js';
import userRouter from './routes/userRoutes.js';
import sellerRouter from './routes/sellerRoutes.js';
import connectCloudinary from './config/cloudinary.js';
import cartRouter from './routes/cartRoute.js';
import productRouter from './routes/productRoute.js';
import addressRouter from './routes/addressRoutes.js';
import orderRouter from './routes/orderRoutes.js';
dotenv.config();
const app = express()
const port = process.env.PORT || 3000  ; 
// console.log('port -> ', port)

await connectDB()
await connectCloudinary()

app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin : ['http://localhost:5173'], credentials : true
})); 

app.get('/', (req, res)=> res.send("server is working...!!"))
app.use('/api/user', userRouter)
app.use('/api/seller', sellerRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/address', addressRouter)
app.use('/api/order',orderRouter)

app.listen(port , ()=>{
    console.log(`http://localhost:${port}/`)
})