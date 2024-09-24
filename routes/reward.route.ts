import { Router } from 'express';
import { RewardController } from '../controllers/reward.controller';
import { RewardRepository } from '../repositories/reward.repository';
import authUser from '../middlewares/auth.middleware';
import authAdmin from '../middlewares/authAdmin.middleware';

const rewardRouter = Router();
const rewardRepository = new RewardRepository();
const rewardController = new RewardController(rewardRepository);

// Get all rewards (accessible to all authenticated users)
rewardRouter.get('/', authUser, rewardController.getAllRewards);

// Get a specific reward (accessible to all authenticated users)
rewardRouter.get('/:id', authUser, rewardController.getRewardById);

// Create a new reward (admin only)
rewardRouter.post('/', authUser, authAdmin, rewardController.createReward);

// Update a reward (admin only)
rewardRouter.put('/:id', authUser, authAdmin, rewardController.updateReward);

// Delete a reward (admin only)
rewardRouter.delete('/:id', authUser, authAdmin, rewardController.deleteReward);

export default rewardRouter;