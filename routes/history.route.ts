import express, {Router} from 'express';
import locationController from '../controllers/location.controller';
import authAdmin from '../middlewares/authAdmin.middleware';
import historyController from '../controllers/history.controller';

const historyRouter: Router = express.Router();

historyRouter.get('/', historyController.getHistories);
historyRouter.get('/:id', historyController.getHistory);
historyRouter.get('/user/:user', historyController.getHistoryByUser);
historyRouter.post('/', historyController.createHistory);
historyRouter.put('/:id', historyController.updateHistory);
historyRouter.delete('/:id', historyController.deleteHistory);

export default historyRouter;
