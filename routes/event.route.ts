import express, { Router } from 'express';
import eventController from '../controllers/event.controller';
import authUser from '../middlewares/auth.middleware';
import authOrganizer from '../middlewares/authOrganizer.middleware';

const eventRouter: Router = express.Router();

eventRouter.get('/', eventController.getEvents);
eventRouter.get('/:id', eventController.getEvent);
eventRouter.get('/user/:id', eventController.getEventByUser);
eventRouter.get('/category/:category', eventController.getEventByCategory);
eventRouter.post('/', authUser, authOrganizer, eventController.createEvent);
eventRouter.put('/:id', authUser, authOrganizer, eventController.updateEvent);
eventRouter.delete('/:id', authUser, authOrganizer, eventController.deleteEvent);
eventRouter.put('/status', authUser, authOrganizer, eventController.updateEventStatus);
eventRouter.post('/:id/funding', authUser, authOrganizer, eventController.fundingEvent);
eventRouter.post('/:id/donate', authUser, eventController.donateEvent);

export default eventRouter;