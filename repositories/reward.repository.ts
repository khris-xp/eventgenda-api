import Reward, { IReward } from '../models/reward.model';
import { EventRepository } from '../repositories/event.repository';
import { UserRepository } from '../repositories/user.repository';
import { UserRewardRepository } from '../repositories/userReward.repository';

export class RewardRepository {
  private eventRepository: EventRepository;
  private userRepository: UserRepository;
  private userRewardRepository: UserRewardRepository;

  constructor() {
    this.eventRepository = new EventRepository();
    this.userRepository = new UserRepository();
    this.userRewardRepository = new UserRewardRepository();
  }

  async findById(id: string): Promise<IReward | null> {
    return Reward.findById(id);
  }

  async checkUserClaimedReward(userId: string, rewardId: string): Promise<boolean> {
    const userReward = await this.userRewardRepository.findByUserAndReward(userId, rewardId);
    return !!userReward;
  }

  async checkUserDonationEligibility(userId: string, eventId: string): Promise<boolean> {
    const event = await this.eventRepository.findById(eventId);
    if (!event) return false;
    
    const userDonation = event.donations.find(donation => donation.userId.toString() === userId);
    return !!userDonation && userDonation.amount > 0;
  }

  async claimReward(userId: string, rewardId: string, eventId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    const reward = await this.findById(rewardId);
    const event = await this.eventRepository.findById(eventId);

    if (!user || !reward || !event) {
      throw new Error('User, Reward, or Event not found');
    }

    // Check if user has enough points
    if (user.points < reward.price) {
      throw new Error('Insufficient points');
    }

    // Deduct points from user
    user.points -= reward.price;
    await this.userRepository.update(userId, { points: user.points });

    // Record that the user has claimed this reward
    await this.userRewardRepository.create({ userId, rewardId, eventId });

    // You might want to update the event or reward status here as well
    // For example, decrement the available quantity of the reward
    if (reward.quantity > 0) {
      reward.quantity -= 1;
      await this.update(rewardId, { quantity: reward.quantity });
    }
  }
}