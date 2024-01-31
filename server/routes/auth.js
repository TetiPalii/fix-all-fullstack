import { Router } from 'express';
import { getMe, login, register } from '../controllers/auth.js';
import { checkAuth } from '../utils/checkAuth.js';


const router = new Router();
// http://localhost:5000/api/auth/register

router.post('/register', register);

//http://localhost:5000/api/auth/login
router.post('/login', login);

//http://localhost:5000/api/auth/me
router.get('/me'), checkAuth, getMe
export default router