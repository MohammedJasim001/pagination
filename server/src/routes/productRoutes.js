import express from 'express'
import { getProducts } from '../controller/productController.js'

const router = express.Router()

router.get('/products',getProducts)

export default router