import express, { Router } from 'express';
import organizationController from '../controllers/organization.controller';
import authUser from '../middlewares/auth.middleware';
import authOrganizer from '../middlewares/authOrganizer.middleware';
import authAdmin from '../middlewares/authAdmin.middleware';

const organizationRouter: Router = express.Router();

organizationRouter.get('/', organizationController.getOrganizations);
organizationRouter.get('/:id', organizationController.getOrganization);
// organizationRouter.get('/user', authUser, authOrganizer, organizationController.getOrganizationsByUser);
organizationRouter.put('/:id', authUser, authOrganizer, organizationController.updateOrganization);
organizationRouter.delete('/:id', authUser, authOrganizer, organizationController.deleteOrganization);
organizationRouter.post('/:id', authUser, authAdmin, organizationController.createOrganization);

export default organizationRouter;