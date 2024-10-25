import express, { Router } from 'express';
import sponsorController from '../controllers/sponsor.controller';
import verifyToken from '../middlewares/auth.middleware';
import authorizeRoles from '../middlewares/role.middleware';

const sponsorRouter: Router = express.Router();

sponsorRouter.get('/', sponsorController.getSponsors);
sponsorRouter.get('/:id', sponsorController.getSponsor);
sponsorRouter.get('/event/:id', sponsorController.getSponsorByEvent);
sponsorRouter.get('/user/:id', sponsorController.getSponsorByUser);
sponsorRouter.post('/', verifyToken, authorizeRoles("user", "organizer"), sponsorController.createSponsor);
sponsorRouter.put('/:id', verifyToken, authorizeRoles("admin"), sponsorController.updateSponsor);
sponsorRouter.delete('/:id', verifyToken, authorizeRoles("admin"), sponsorController.deleteSponsor);

export default sponsorRouter;