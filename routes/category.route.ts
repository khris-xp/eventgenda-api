import express, { Router } from 'express';
import CategoryController from '../controllers/category.controller';
import authAdmin from '../middlewares/authAdmin.middleware';

const categoryRouter : Router  = express.Router();

categoryRouter.get('/categories', CategoryController.getCategories);

categoryRouter.get('/categories/:id', CategoryController.getCategory);

categoryRouter.get('/categories/name/:name', CategoryController.getCategoryByName);

categoryRouter.post('/categories', authAdmin ,CategoryController.createCategory);

categoryRouter.put('/categories/:id', authAdmin,CategoryController.updateCategory);

categoryRouter.delete('/categories/:id', authAdmin,CategoryController.deleteCategory);

export default categoryRouter;

