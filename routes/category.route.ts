import express, { Router } from 'express';
import CategoryController from '../controllers/category.controller';

const categoryRouter : Router  = express.Router();

categoryRouter.get('/categories', CategoryController.getCategories);

categoryRouter.get('/categories/:id', CategoryController.getCategory);

categoryRouter.get('/categories/name/:name', CategoryController.getCategoryByName);

categoryRouter.post('/categories', CategoryController.createCategory);

categoryRouter.put('/categories/:id', CategoryController.updateCategory);

categoryRouter.delete('/categories/:id', CategoryController.deleteCategory);

export default categoryRouter;

