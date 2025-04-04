import path from "node:path";

import { Router } from "express";
import multer from "multer";
import { createCategory } from "./useCases/categories/createCategory";
import { listCategories } from "./useCases/categories/listCategories";
import { listProductsByCategory } from "./useCases/categories/listProductsByCategory";
import { createOrder } from "./useCases/orders/createOrder";
import { listOrders } from "./useCases/orders/listOrders";
import { createProduct } from "./useCases/products/createProduct";
import { listProducts } from "./useCases/products/listProducts";
import { changeOrderStatus } from "./useCases/orders/chageOrderStatus";
import { cancelOrder } from "./useCases/orders/cancelOrder";

export const router = Router()

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback){
      callback(null, path.resolve(__dirname, '..', 'uploads'))
    },
    filename(req, file, callback){
      callback(null, `${Date.now()}-${file.originalname}`)
    },
  })
})

router.get('/categories', listCategories)

router.post('/categories', createCategory)

router.get('/products', listProducts)

router.post('/products', upload.single('image') ,createProduct)

router.get('/categories/:categoryId/products', listProductsByCategory)

router.get('/orders', listOrders)

router.post('/orders', createOrder)

router.patch('/orders/:orderId', changeOrderStatus)

router.delete('/orders/:orderId', cancelOrder)
