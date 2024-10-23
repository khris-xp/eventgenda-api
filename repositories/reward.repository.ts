import { CreateRewardDto, UpdateRewardDto } from '../common/dto/reward.dto';
import RewardModel from '../models/reward.model';
import { RewardDocument } from '../types/reward.d';

export class RewardRepository {
  async create(createRewardDto: CreateRewardDto): Promise<RewardDocument> {
    const newReward = new RewardModel(createRewardDto);
    return await newReward.save();
  }

  async findAll(): Promise<RewardDocument[]> {
    return await RewardModel.find();
  }

  async findById(id: string): Promise<RewardDocument | null> {
    return await RewardModel.findById(id);
  }

  async update(
    id: string,
    updateRewardDto: UpdateRewardDto
  ): Promise<RewardDocument | null> {
    return await RewardModel.findByIdAndUpdate(id, updateRewardDto, {
      new: true,
    });
  }

  async delete(id: string): Promise<RewardDocument | null> {
    return await RewardModel.findByIdAndDelete(id);
  }
}
