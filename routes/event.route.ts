import express, { Router } from 'express';
import eventController from '../controllers/event.controller';
import authUser from '../middlewares/auth.middleware';
import authAdmin from '../middlewares/authAdmin.middleware';
import authOrganizer from '../middlewares/authOrganizer.middleware';

const eventRouter: Router = express.Router();

eventRouter.get('/', eventController.getEvents);
eventRouter.get('/:id', eventController.getEvent);
eventRouter.get('/user/:id', eventController.getEventByUser);
eventRouter.get('/category/:category', eventController.getEventByCategory);
eventRouter.post('/', authUser, authOrganizer, eventController.createEvent);
eventRouter.put('/:id', authUser, authOrganizer, eventController.updateEvent);
eventRouter.delete(
  '/:id',
  authUser,
  authOrganizer,
  eventController.deleteEvent
);
eventRouter.put(
  '/status',
  authUser,
  authOrganizer,
  eventController.updateEventStatus
);
eventRouter.post(
  '/:id/funding',
  authUser,
  authOrganizer,
  eventController.fundingEvent
);
eventRouter.post('/:id/donate', authUser, eventController.donateEvent);

eventRouter.post('/:eventId/join', authUser, eventController.joinEvent);
eventRouter.post('/:eventId/exit', authUser, eventController.exitEvent);

eventRouter.put(
  '/:eventId/approve',
  authUser,
  authAdmin,
  eventController.approveEvent
);
eventRouter.put(
  '/:eventId/reject',
  authUser,
  authAdmin,
  eventController.rejectEvent
);

export default eventRouter;
