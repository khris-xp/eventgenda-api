import express, { Router } from 'express';
import CategoryController from '../controllers/category.controller';
import authUser from '../middlewares/auth.middleware';
import authAdmin from '../middlewares/authAdmin.middleware';

const categoryRouter: Router = express.Router();

categoryRouter.get('/', CategoryController.getCategories);

categoryRouter.get('/:id', CategoryController.getCategory);

categoryRouter.get('/name/:name', CategoryController.getCategoryByName);

categoryRouter.post(
  '/',
  authUser,
  authAdmin,
  CategoryController.createCategory
);

categoryRouter.put('/:id', authAdmin, CategoryController.updateCategory);

categoryRouter.delete('/:id', CategoryController.deleteCategory);

export default categoryRouter;
