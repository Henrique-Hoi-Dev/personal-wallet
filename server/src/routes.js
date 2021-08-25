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

routes.post('/users/signup', UserController.store);
routes.post('/users/signin', SessionController.store);
routes.post('/validateToken', SessionController.validateToken);

routes.use(authMiddleware);

routes.post('/files', upload.single('file'), FileController.store);

// rotas usuario
routes.put('/user/:id', UserController.update);
routes.get('/user', UserController.getAllUser);
routes.get('/user/:id', UserController.getUserId);

// rotas de registro e edição de contas
routes.post('/account/new', AccountController.store);
routes.put('/account/:id', AccountController.updateAccount);

// rotas de chamada dos cards
routes.get('/infoCardOverdue', AccountController.getCardInfoOverdue);
routes.get('/infoCardOwing', AccountController.getCardInfoOwing);
routes.get('/infoCardPaid', AccountController.getCardInfoPaid);
routes.get('/infoCardTotal', AccountController.getCardInfoTotal);

// rotas de chamada das contas
routes.get('/account/:id', AccountController.getById);
routes.get('/account', AccountController.getAll);
routes.get('/vencido', AccountController.getOverdueAccount);

// rota de deletar conta
routes.delete('/account/:id', AccountController.deleteAccount);

export default routes;
