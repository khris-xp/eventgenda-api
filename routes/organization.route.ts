import express, { Router } from 'express';
import organizationController from '../controllers/organization.controller';
import verifyToken from '../middlewares/auth.middleware';
import authorizeRoles from '../middlewares/role.middleware';

const organizationRouter: Router = express.Router();

organizationRouter.get('/', organizationController.getOrganizations);
organizationRouter.get('/:id', organizationController.getOrganization);
organizationRouter.get('/user/:userId', organizationController.getOrganizationByUser);
organizationRouter.post('/', verifyToken, authorizeRoles("organizer"), organizationController.createOrganization);
organizationRouter.put('/:id', verifyToken, authorizeRoles("organizer", "admin"), organizationController.updateOrganization);
organizationRouter.delete('/:id', verifyToken, authorizeRoles("organizer", "admin"), organizationController.deleteOrganization);

export default organizationRouter;