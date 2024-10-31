import express, { Router } from 'express';
import CategoryController from '../controllers/category.controller';
import verifyToken from '../middlewares/auth.middleware';
import authorizeRoles from '../middlewares/role.middleware';

const categoryRouter: Router = express.Router();

categoryRouter.get('/', CategoryController.getCategories);
categoryRouter.get('/:id', CategoryController.getCategory);
categoryRouter.get('/name/:name', CategoryController.getCategoryByName);
categoryRouter.post('/', verifyToken, authorizeRoles("admin"), CategoryController.createCategory);
categoryRouter.put('/:id', verifyToken, authorizeRoles("admin"), CategoryController.updateCategory);
categoryRouter.delete('/:id', verifyToken, authorizeRoles("admin"), CategoryController.deleteCategory);

export default categoryRouter;
