import { Router } from 'express';
import { check } from 'express-validator';

import { createProduct, getProducts, updateProduct, deleteProduct, getProductInfo, deleteProductBatch } from '../controller/products';
import { authUser } from '../middleware/auth/user';

const router = Router();

router.post('/', [
    check('title', 'title is required').not().isEmpty(), 
    check('price', 'title is required').isNumeric(), 
    check('description', 'title is required').not().isEmpty(), 
    check('status', 'title is required').isBoolean(), 
], authUser, createProduct);

router.get('/', authUser, getProducts);

router.get('/:id', authUser, getProductInfo);

router.put('/:id',  [
    check('title', 'title is required').not().isEmpty(), 
    check('price', 'title is required').isNumeric(), 
    check('description', 'title is required').not().isEmpty(), 
    check('status', 'title is required').isBoolean(), 
], authUser, updateProduct);

router.delete('/:id', authUser, deleteProduct);

router.post('/batch', authUser, deleteProductBatch);

export default router;