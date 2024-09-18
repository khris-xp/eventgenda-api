import { Router } from 'express';
import projectController from '../controllers/project.controller';

const projectRouter = Router();

projectRouter.post('/create', projectController.createProject);
projectRouter.get('/', projectController.getAllProjects);
projectRouter.get('/:id', projectController.getProjectById);
projectRouter.put('/:id', projectController.updateProject);
projectRouter.delete('/:id', projectController.deleteProject);

export default projectRouter;
