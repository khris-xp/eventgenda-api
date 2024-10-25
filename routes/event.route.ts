import express, { Router } from 'express';
import eventController from '../controllers/event.controller';
import verifyToken from '../middlewares/auth.middleware';
import authorizeRoles from '../middlewares/role.middleware';

const eventRouter: Router = express.Router();

eventRouter.get('/', eventController.getEvents);
eventRouter.get('/:id', eventController.getEvent);
eventRouter.get('/user/:id', eventController.getEventByUser);
eventRouter.get('/category/:category', eventController.getEventByCategory);
eventRouter.post('/', verifyToken, authorizeRoles("organizer"), eventController.createEvent);
eventRouter.put('/:id', verifyToken, authorizeRoles("organizer", "admin"), eventController.updateEvent);
eventRouter.delete('/:id', verifyToken, authorizeRoles("organizer", "admin"), eventController.deleteEvent);

eventRouter.post('/:id/funding', verifyToken, authorizeRoles("organizer"), eventController.fundingEvent);
eventRouter.post('/:id/donate', verifyToken, authorizeRoles("user"), eventController.donateEvent);

eventRouter.post('/:eventId/join', verifyToken, authorizeRoles("user"), eventController.joinEvent);
eventRouter.post('/:eventId/exit', verifyToken, authorizeRoles("user"), eventController.exitEvent);

eventRouter.put('/:eventId/approve', verifyToken, authorizeRoles("admin"), eventController.approveEvent);
eventRouter.put('/:eventId/reject', verifyToken, authorizeRoles("admin"), eventController.rejectEvent);

export default eventRouter;
