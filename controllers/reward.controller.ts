import { Request, Response } from 'express';
import { RewardRepository } from '../repositories/reward.repository';
import { CreateRewardDto, UpdateRewardDto } from '../common/dto/reward.dto';
import { handleError } from '../utils/error.utils';
import { successResponseStatus, errorResponseStatus } from '../utils/response.utils';
export class RewardController {
    private rewardRepository: RewardRepository;

    constructor(rewardRepository: RewardRepository) {
      this.rewardRepository = rewardRepository;
    }
  
    createReward = async (req: Request, res: Response) => {
      try {
        const createRewardDto: CreateRewardDto = req.body;
        const newReward = await this.rewardRepository.create(createRewardDto);
        return successResponseStatus(res, 'Reward created successfully', newReward);
      } catch (error) {
        return handleError(res, error);
      }
    }
  
    getAllRewards = async (req: Request, res: Response) => {
      try {
        const rewards = await this.rewardRepository.findAll();
        return successResponseStatus(res, 'Rewards retrieved successfully', rewards);
      } catch (error) {
        return handleError(res, error);
      }
    }
  

    getRewardById = async (req: Request, res: Response) => {
        try {
        const { id } = req.params;
        const reward = await this.rewardRepository.findById(id);
        if (!reward) {
            return errorResponseStatus(404, res, 'Reward not found', null);
        }
        return successResponseStatus(res, 'Reward retrieved successfully', reward);
        } catch (error) {
        return handleError(res, error);
        }
    }

    updateReward = async (req: Request, res: Response) => {
        try {
        const { id } = req.params;
        const updateRewardDto: UpdateRewardDto = req.body;
        const updatedReward = await this.rewardRepository.update(id, updateRewardDto);
        if (!updatedReward) {
            return errorResponseStatus(404, res, 'Reward not found', null);
        }
        return successResponseStatus(res, 'Reward updated successfully', updatedReward);
        } catch (error) {
        return handleError(res, error);
        }
    }

    deleteReward = async (req: Request, res: Response) => {
        try {
        const { id } = req.params;
        const deletedReward = await this.rewardRepository.delete(id);
        if (!deletedReward) {
            return errorResponseStatus(404, res, 'Reward not found', null);
        }
        return successResponseStatus(res, 'Reward deleted successfully', deletedReward);
        } catch (error) {
        return handleError(res, error);
        }
    }
}