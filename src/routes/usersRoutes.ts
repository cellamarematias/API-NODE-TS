import { Router } from 'express';
import { authUser } from '../controllers/userController';

const router = Router();

// router.get('/users', getUsers);
// router.get('/users/:id', getUserById);
// router.post('/users', createUser);
// router.patch('/users/:id', updateUser);
// router.delete('/users/:id', deleteUser);
router.post('/users/auth', authUser);


export default router;