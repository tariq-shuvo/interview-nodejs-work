import { Router } from 'express';
import { check } from 'express-validator';

import { createProduct, getProducts, updateProduct, deleteProduct, getProductInfo, deleteProductBatch } from '../controller/products';
import { authUser } from '../middleware/auth/user';

const router = Router();

router.post('/', [
    check('title', 'title is required').not().isEmpty(), 
    check('price', 'price is required').isNumeric(), 
    check('status', 'status is required').isBoolean(),
    check('description', 'description is required').not().isEmpty(),  
], authUser, createProduct);

router.get('/', getProducts);

router.get('/:id', getProductInfo);

router.put('/:id',  [
    check('title', 'title is required').not().isEmpty(), 
    check('price', 'price is required').isNumeric(), 
    check('description', 'description is required').not().isEmpty(), 
    check('status', 'status is required').isBoolean(), 
], authUser, updateProduct);

router.delete('/:id', authUser, deleteProduct);

router.post('/batch', authUser, deleteProductBatch);

export default router;