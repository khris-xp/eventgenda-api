//  defines API endpoints and links them to controller methods
import express, { Router } from 'express';
import eventRuleController from '../controllers/eventRule.controller';
import verifyToken from '../middlewares/auth.middleware';
import authorizeRoles from '../middlewares/role.middleware';

const eventRuleRouter: Router = express.Router();

// Get all event rules - accessible to all users
eventRuleRouter.get('/',  eventRuleController.getAllEventRules);
// Get a specific event rule by ID 
eventRuleRouter.get('/:id', eventRuleController.getEventRule);
// Create a new event rule - restricted to admin users
eventRuleRouter.post('/', verifyToken, authorizeRoles("organizer", "admin"), eventRuleController.createEventRule);
// Update an existing event rule - restricted to admin users
eventRuleRouter.put('/:id', verifyToken , authorizeRoles("organizer", "admin"), eventRuleController.updateEventRule);
// Delete an event rule - restricted to admin users
eventRuleRouter.delete('/:id', verifyToken, authorizeRoles("organizer", "admin"), eventRuleController.deleteEventRule);

export default eventRuleRouter;