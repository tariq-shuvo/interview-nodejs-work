import { Router } from 'express'
import { check } from 'express-validator'

import { createTodo, getTodos, updateTodo, deleteTodo } from '../controller/todos'

const router = Router()

router.post('/', [
    check('title', 'title is required').not().isEmpty(),
    check('message', 'message is required').not().isEmpty()  
], createTodo)

router.get('/', getTodos)

router.put('/:id',  [
    check('title', 'title is required').not().isEmpty(),
    check('message', 'message is required').not().isEmpty()  
], updateTodo)

router.delete('/:id', deleteTodo)

export default router