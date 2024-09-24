import { Request, Response } from 'express';
import { RewardRepository } from '../repositories/reward.repository';
import { handleError } from '../utils/error.utils';
import { successResponseStatus, errorResponseStatus } from '../utils/response.utils';

export class RewardController {
  private rewardRepository: RewardRepository;

  constructor() {
    this.rewardRepository = new RewardRepository();
  }

  async getReward(req: Request, res: Response) {
    try {
      const rewardId = req.params.id;
      const reward = await this.rewardRepository.findById(rewardId);
      if (!reward) {
        return handleError(res, new Error('Reward not found'));
      }
      return successResponseStatus(res, 'Reward retrieved successfully', reward);
    } catch (error) {
      return handleError(res, error);
    }
  }

  async getAllRewards(req: Request, res: Response) {
    try {
      const rewards = await this.rewardRepository.findAll();
      return successResponseStatus(res, 'Rewards retrieved successfully', rewards);
    } catch (error) {
      return handleError(res, error);
    }
  }

  async createReward(req: Request, res: Response) {
    try {
      const rewardData = req.body;
      const newReward = await this.rewardRepository.create(rewardData);
      return successResponseStatus(res, 'Reward created successfully', newReward);
    } catch (error) {
      return handleError(res, error);
    }
  }

  async updateReward(req: Request, res: Response) {
    try {
      const rewardId = req.params.id;
      const rewardData = req.body;
      const updatedReward = await this.rewardRepository.update(rewardId, rewardData);
      if (!updatedReward) {
        return handleError(res, new Error('Reward not found'));
      }
      return successResponseStatus(res, 'Reward updated successfully', updatedReward);
    } catch (error) {
      return handleError(res, error);
    }
  }

  async deleteReward(req: Request, res: Response) {
    try {
      const rewardId = req.params.id;
      const deletedReward = await this.rewardRepository.delete(rewardId);
      if (!deletedReward) {
        return handleError(res, new Error('Reward not found'));
      }
      return successResponseStatus(res, 'Reward deleted successfully', deletedReward);
    } catch (error) {
      return handleError(res, error);
    }
  }

  async receiveReward(req: Request, res: Response) {
    try {
      const rewardId = req.params.id;
      const eventId = req.params.eventId; // Assuming the eventId is passed in the request
      const userId = (req as any).user._id;

      // Check if the user has already claimed this reward
      const hasClaimedReward = await this.rewardRepository.checkUserClaimedReward(userId, rewardId);
      if (hasClaimedReward) {
        return errorResponseStatus(400, res, 'You have already claimed this reward', null);
      }

      // Check if the user has donated to the event
      const hasDonated = await this.rewardRepository.checkUserDonationEligibility(userId, eventId);
      if (!hasDonated) {
        return errorResponseStatus(400, res, 'You must donate to the event to claim this reward', null);
      }

      // Claim the reward
      await this.rewardRepository.claimReward(userId, rewardId, eventId);

      return successResponseStatus(res, 'Reward received successfully', null);
    } catch (error) {
      return handleError(res, error);
    }
  }
}
