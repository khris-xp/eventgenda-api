import express, { Router } from 'express';
import locationController from '../controllers/location.controller';
import verifyToken from '../middlewares/auth.middleware';
import authorizeRoles from '../middlewares/role.middleware';

const locationRouter: Router = express.Router();

locationRouter.get('/', locationController.getLocations);
locationRouter.get('/:id', locationController.getLocation);
locationRouter.get('/name/:name', locationController.getLocationByName);
locationRouter.post('/', verifyToken, authorizeRoles("admin"), locationController.createLocation);
locationRouter.put('/:id', verifyToken, authorizeRoles("admin"), locationController.updateLocation);
locationRouter.delete('/:id', verifyToken, authorizeRoles("admin"), locationController.deleteLocation);

export default locationRouter;
