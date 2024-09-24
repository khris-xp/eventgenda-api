import express, { Router } from 'express';
import organizationController from '../controllers/organization.controller';
import authUser from '../middlewares/auth.middleware';
import authOrganizer from '../middlewares/authOrganizer.middleware';

const organizationRouter: Router = express.Router();

organizationRouter.get('/', organizationController.getOrganizations);
organizationRouter.get('/:id', organizationController.getOrganization);
organizationRouter.get('/user', authUser, authOrganizer, organizationController.getOrganizationByUser);
organizationRouter.post('/', authUser, authOrganizer, organizationController.createOrganization);
organizationRouter.put('/', authUser, authOrganizer, organizationController.updateOrganization);
organizationRouter.delete('/', authUser, authOrganizer, organizationController.deleteOrganization);

export default organizationRouter;