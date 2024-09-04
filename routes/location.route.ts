import express, { Router } from 'express';
import locationController from '../controllers/location.controller';
import authAdmin from '../middlewares/authAdmin.middleware';

const locationRouter: Router = express.Router();

locationRouter.get('/', locationController.getLocations);
locationRouter.get('/:id', locationController.getLocation);
locationRouter.get('/name/:name', locationController.getLocationByName);
// locationRouter.post('/', authAdmin, locationController.createLocation);
// locationRouter.put('/:id', authAdmin, locationController.updateLocation);
// locationRouter.delete('/:id', authAdmin, locationController.deleteLocation);
locationRouter.post('/', locationController.createLocation);
locationRouter.put('/:id', locationController.updateLocation);
locationRouter.delete('/:id', locationController.deleteLocation);

export default locationRouter;