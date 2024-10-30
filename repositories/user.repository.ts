import { UpdateUserDto } from '../common/dto/user.dto';
import { default as User } from '../models/user.model';

class UserRepository {
  async findById(userId: string) {
    if (!userId) throw new Error('User does not exist.');
    const user = await User.findById(userId)
      .populate('organization')
      .populate({
        path: 'history',
        populate: [{ path: 'event' }, { path: 'user' }],
      })
      .populate('redeemedRewards')
      .select('-password');
    if (!user) throw new Error('User does not exist.');
    return user;
  }

  async findByOrg(orgId: string) {
    if (!orgId) throw new Error('Organization does not exist.');
    const user = await User.findOne({ organization: orgId })
      .populate('organization')
      .populate('history')
      .select('-password');
    if (!user) throw new Error('User does not exist.');
    if (user.role !== 'organizer') throw new Error('User is not an organizer.');
    return user;
  }

  async updateOne(id: string, updates: Partial<UpdateUserDto>): Promise<void> {
    await User.findById(id).updateOne(updates).exec();
  }
}

export default new UserRepository();
