import express, { Router } from 'express'
import { ProductControllers } from "./product.controller";

const router = express.Router();

router.post('/products', ProductControllers.createProduct);
router.get('/products', ProductControllers.getAllProducts);
router.get('/products/:productId', ProductControllers.getSingleProduct);
router.delete('/products/:productId', ProductControllers.deleteProduct);
router.put('/products/:productId', ProductControllers.updateProduct);
router.get('/categories-product/name',ProductControllers.getCategoriesProducts);
router.post('/products/update-stock',ProductControllers.updateStockForProducts);

export const ProductRoutes = router;
