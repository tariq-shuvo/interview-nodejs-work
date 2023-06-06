import { Router } from 'express'
import { check } from 'express-validator'

import { registerUser, loginUser, fetchUserInfo, refreshTokenGenerate } from '../controller/users'
import { authUser } from '../middleware/auth/user'

const router = Router()

router.post('/', [
    check('username', 'username is required').not().isEmpty(),
    check('first_name', 'first name is required').not().isEmpty(),  
    check('last_name', 'last name is required').not().isEmpty(),  
    check('email', 'email is required').not().isEmpty(),  
    check('address', 'address is required').not().isEmpty(),  
    check('password', 'password is required').not().isEmpty(),  
], registerUser)

router.post('/auth', [
    check('username', 'username is required').not().isEmpty(), 
    check('password', 'password is required').not().isEmpty(),  
], loginUser)

router.get('/auth', authUser, fetchUserInfo)

router.post('/auth/refresh', authUser, refreshTokenGenerate)

export default router