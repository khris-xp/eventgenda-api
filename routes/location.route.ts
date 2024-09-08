import express, { Router } from 'express';
import locationController from '../controllers/location.controller';
import authUser from '../middlewares/auth.middleware';
import authAdmin from '../middlewares/authAdmin.middleware';

const locationRouter: Router = express.Router();

locationRouter.get('/', locationController.getLocations);
locationRouter.get('/:id', locationController.getLocation);
locationRouter.get('/name/:name', locationController.getLocationByName);
locationRouter.post('/', authUser, authAdmin, locationController.createLocation);
locationRouter.put('/:id', authUser, authAdmin, locationController.updateLocation);
locationRouter.delete('/:id', authUser, authAdmin, locationController.deleteLocation);

export default locationRouter;