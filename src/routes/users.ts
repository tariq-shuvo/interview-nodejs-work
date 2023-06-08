import { Router } from 'express';
import { check } from 'express-validator';

import { registerUser, loginUser, fetchUserInfo, refreshTokenGenerate, logoutUser } from '../controller/users';
import { authUser } from '../middleware/auth/user';

const router = Router();

router.post('/', [
    check('username', 'empty space is not allowed into username').not().isEmpty().custom(value => !/\s/.test(value)),
    check('first_name', 'first name is required').not().isEmpty(),  
    check('last_name', 'last name is required').not().isEmpty(),  
    check('email', 'email is required').isEmail(),  
    check('address', 'address is required').not().isEmpty(),  
    check('password', 'password is required').isLength({min: 8}),  
    check('confirm_password', 'password confirmation do not match').custom((value, {req}) => value == req.body.password)  
], registerUser);

router.post('/auth', [
    check('username', 'username is required').not().isEmpty(), 
    check('password', 'password is required').not().isEmpty(),  
], loginUser);

router.get('/auth', authUser, fetchUserInfo);

router.get('/auth/refresh', authUser, refreshTokenGenerate);

router.get('/auth/logout', authUser, logoutUser);

export default router;