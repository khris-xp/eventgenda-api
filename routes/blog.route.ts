import express, { Router } from 'express';
import blogController from '../controllers/blog.controller';
import authUser from '../middlewares/auth.middleware';

const blogRouter: Router = express.Router();

blogRouter.get('/', blogController.getBlogs);
blogRouter.get('/:id', blogController.getBlog);
blogRouter.post('/', authUser, blogController.createBlog);
blogRouter.put('/:id', authUser, blogController.updateBlog);
blogRouter.delete('/:id', authUser, blogController.deleteBlog);

export default blogRouter;
