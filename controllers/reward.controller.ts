import { Request, Response } from 'express';
import { CreateRewardDto, UpdateRewardDto } from '../common/dto/reward.dto';
import { RewardRepository } from '../repositories/reward.repository';
import UserRepository from '../repositories/user.repository';
import { handleError } from '../utils/error.utils';
import {
  errorResponseStatus,
  successResponseStatus,
} from '../utils/response.utils';
export class RewardController {
  private rewardRepository: RewardRepository;

  constructor(rewardRepository: RewardRepository) {
    this.rewardRepository = rewardRepository;
  }

  createReward = async (req: Request, res: Response) => {
    try {
      const createRewardDto: CreateRewardDto = req.body;
      const newReward = await this.rewardRepository.create(createRewardDto);
      return successResponseStatus(
        res,
        'Reward created successfully',
        newReward
      );
    } catch (error) {
      return handleError(res, error);
    }
  };

  getAllRewards = async (req: Request, res: Response) => {
    try {
      const rewards = await this.rewardRepository.findAll();
      return successResponseStatus(
        res,
        'Rewards retrieved successfully',
        rewards
      );
    } catch (error) {
      return handleError(res, error);
    }
  };

  getRewardById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const reward = await this.rewardRepository.findById(id);
      if (!reward) {
        return errorResponseStatus(404, res, 'Reward not found', null);
      }
      return successResponseStatus(
        res,
        'Reward retrieved successfully',
        reward
      );
    } catch (error) {
      return handleError(res, error);
    }
  };

  addRewardToUser = async (req: Request, res: Response) => {
    try {
      const userId = req.user?._id;
      const rewardId = req.params.rewardId;

      const user = await UserRepository.findById(userId);
      const reward = await this.rewardRepository.findById(rewardId);
      if (!reward) {
        return errorResponseStatus(404, res, 'Reward not found', null);
      }

      user.redeemedRewards.push(reward);

      if (user.rewardPoints < reward.price) {
        return errorResponseStatus(
          400,
          res,
          'User does not have enough reward points',
          null
        );
      }

      user.reward -= reward.price;
      await user.save();

      return successResponseStatus(
        res,
        'Reward added to user successfully',
        user
      );
    } catch (error) {
      return handleError(res, error);
    }
  };

  updateReward = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updateRewardDto: UpdateRewardDto = req.body;
      const updatedReward = await this.rewardRepository.update(
        id,
        updateRewardDto
      );
      if (!updatedReward) {
        return errorResponseStatus(404, res, 'Reward not found', null);
      }
      return successResponseStatus(
        res,
        'Reward updated successfully',
        updatedReward
      );
    } catch (error) {
      return handleError(res, error);
    }
  };

  deleteReward = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedReward = await this.rewardRepository.delete(id);
      if (!deletedReward) {
        return errorResponseStatus(404, res, 'Reward not found', null);
      }
      return successResponseStatus(
        res,
        'Reward deleted successfully',
        deletedReward
      );
    } catch (error) {
      return handleError(res, error);
    }
  };
}
