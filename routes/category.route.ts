import express, { Router } from 'express';
import CategoryController from '../controllers/category.controller';
import authAdmin from '../middlewares/authAdmin.middleware';

const categoryRouter: Router = express.Router();

categoryRouter.get('/', CategoryController.getCategories);

categoryRouter.get('/:id', CategoryController.getCategory);

categoryRouter.get('/name/:name', CategoryController.getCategoryByName);

categoryRouter.post('/', authAdmin, CategoryController.createCategory);

categoryRouter.put('/:id', authAdmin, CategoryController.updateCategory);

categoryRouter.delete('/:id', CategoryController.deleteCategory);

export default categoryRouter;
