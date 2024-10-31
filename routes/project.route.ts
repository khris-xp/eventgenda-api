import { Router } from 'express';
import projectController from '../controllers/project.controller';
import verifyToken from '../middlewares/auth.middleware';
import authorizeRoles from '../middlewares/role.middleware';

const projectRouter = Router();

projectRouter.post('/:eventId/create', verifyToken, authorizeRoles("user"), projectController.createProject);
projectRouter.get('/', projectController.getAllProjects);
projectRouter.get('/:id', projectController.getProjectById);
projectRouter.put('/:id', verifyToken, authorizeRoles("user"), projectController.updateProject);
projectRouter.delete('/:id', verifyToken, authorizeRoles("user"), projectController.deleteProject);

export default projectRouter;
