import express from 'express';
import { getAllUsers, createUser, deleteUser, editUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.post('/delete/:id', deleteUser);
router.post('/edit/:id', editUser);

export default router;
