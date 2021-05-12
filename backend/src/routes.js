import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controller/SessionController';
import UserController from './app/controller/UserController';

import AccountController from './app/controller/AccountController';
import FileController from './app/controller/FileController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users/register', UserController.store);
routes.post('/users/authenticate', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/account/new', AccountController.store);
routes.put('/account/:id', AccountController.updateAccount);
routes.get('/account', AccountController.getAll);
routes.get('/accounts/:id', AccountController.getById);
routes.delete('/account/:id', AccountController.deleteAccount);

export default routes;
