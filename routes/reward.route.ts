import { Router } from 'express';
import { RewardController } from '../controllers/reward.controller';
import verifyToken from '../middlewares/auth.middleware';
import authorizeRoles from '../middlewares/role.middleware';
import { RewardRepository } from '../repositories/reward.repository';

const rewardRouter = Router();
const rewardRepository = new RewardRepository();
const rewardController = new RewardController(rewardRepository);

// Get all rewards (accessible to all authenticated users)
rewardRouter.get('/', rewardController.getAllRewards);

// Get a specific reward (accessible to all authenticated users)
rewardRouter.get('/:id', rewardController.getRewardById);

// Create a new reward (admin only)
rewardRouter.post(
  '/',
  verifyToken,
  authorizeRoles('admin'),
  rewardController.createReward
);

// Add a reward to a user (authenticated users only)
rewardRouter.post(
  '/:rewardId/add',
  verifyToken,
  authorizeRoles('user', 'organizer'),
  rewardController.addRewardToUser
);

// Update a reward (admin only)
rewardRouter.put(
  '/:id',
  verifyToken,
  authorizeRoles('admin'),
  rewardController.updateReward
);

// Delete a reward (admin only)
rewardRouter.delete(
  '/:id',
  verifyToken,
  authorizeRoles('admin'),
  rewardController.deleteReward
);

export default rewardRouter;
