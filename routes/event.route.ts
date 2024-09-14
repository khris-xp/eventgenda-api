import express, { Router } from 'express';
import eventController from '../controllers/event.controller';
import authUser from '../middlewares/auth.middleware';
import authOrganizer from '../middlewares/authOrganizer.middleware';

const eventRouter: Router = express.Router();

eventRouter.get('/', eventController.getEvents);
eventRouter.get('/:id', eventController.getEvent);
eventRouter.get('/user/:id', eventController.getEventByUser);
eventRouter.get('/category/:category', eventController.getEventByCategory);
eventRouter.post('/', authOrganizer, eventController.createEvent);
eventRouter.put('/:id', authOrganizer, eventController.updateEvent);
eventRouter.delete('/:id', authOrganizer, eventController.deleteEvent);

export default eventRouter;