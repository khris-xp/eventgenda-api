import express, { Router } from 'express';
import sponsorController from '../controllers/sponsor.controller';
import authUser from '../middlewares/auth.middleware';

const sponsorRouter: Router = express.Router();

sponsorRouter.get('/', sponsorController.getSponsors);
sponsorRouter.get('/:id', sponsorController.getSponsor);
sponsorRouter.get('/event/:id', sponsorController.getSponsorByEvent);
sponsorRouter.get('/user/:id', sponsorController.getSponsorByUser);
sponsorRouter.post('/', authUser, sponsorController.createSponsor);
sponsorRouter.put('/funding', authUser, sponsorController.addSponsorFunding);

export default sponsorRouter;