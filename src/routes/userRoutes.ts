import express from 'express';
import { signIn } from '../controllers/userController';

const router = express.Router();

router.post('/sign-in', signIn);

export default router;
