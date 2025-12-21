import express from "express"
import { upload } from "../config/multer.js"
import authSeller from "../middlewares/authSeller.js"
import { addProducts, changeStock, productById, productsLists } from "../controllers/productsControllers.js"

const productRouter = express.Router()

productRouter.post('/add', upload.array(["images"]), authSeller, addProducts);
productRouter.get('/list', productsLists)
productRouter.get('/id', productById)
productRouter.post('/stock', authSeller, changeStock)

export default productRouter;
