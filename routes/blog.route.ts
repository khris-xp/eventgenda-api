import express, { Router } from 'express';
import blogController from '../controllers/blog.controller';
import verifyToken from '../middlewares/auth.middleware';
import authorizeRoles from '../middlewares/role.middleware';

const blogRouter: Router = express.Router();

blogRouter.get('/', blogController.getBlogs);
blogRouter.get('/:id', blogController.getBlog);
blogRouter.get('/user/:id', blogController.getBlogByUser);
blogRouter.get('/category/:category', blogController.getBlogByCategory);
blogRouter.post('/', verifyToken, authorizeRoles("user"), blogController.createBlog);
blogRouter.put('/:id', verifyToken, authorizeRoles("user"), blogController.updateBlog);
blogRouter.delete('/:id', verifyToken, authorizeRoles("user"), blogController.deleteBlog);

export default blogRouter;
