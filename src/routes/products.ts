import { Router } from 'express'
import { check } from 'express-validator'

import { createProduct, getProducts, updateProduct, deleteProduct } from '../controller/products'

const router = Router()

router.post('/', [
    check('title', 'title is required').not().isEmpty(), 
    check('price', 'title is required').isNumeric(), 
    check('description', 'title is required').not().isEmpty(), 
    check('status', 'title is required').isBoolean(), 
], createProduct)

router.get('/', getProducts)

router.put('/:id',  [
    check('title', 'title is required').not().isEmpty(), 
    check('price', 'title is required').isNumeric(), 
    check('description', 'title is required').not().isEmpty(), 
    check('status', 'title is required').isBoolean(), 
], updateProduct)

router.delete('/:id', deleteProduct)

export default router