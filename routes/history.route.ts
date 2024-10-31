import express, {Router} from 'express';
import historyController from '../controllers/history.controller';
import verifyToken from '../middlewares/auth.middleware';
import authorizeRoles from '../middlewares/role.middleware';

const historyRouter: Router = express.Router();

historyRouter.get('/', historyController.getHistories);
historyRouter.get('/:id', historyController.getHistory);
historyRouter.get('/user/:user', historyController.getHistoryByUser);
historyRouter.post('/', verifyToken, authorizeRoles("admin"), historyController.createHistory);
historyRouter.put('/:id', verifyToken, authorizeRoles("admin"), historyController.updateHistory);
historyRouter.delete('/:id', verifyToken, authorizeRoles("admin"), historyController.deleteHistory);

export default historyRouter;
