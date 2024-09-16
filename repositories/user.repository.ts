import { default as User } from '../models/user.model';

class UserRepository {
  async findById(userId: string) {
    if (!userId) throw new Error('User does not exist.');
    const user = await User.findById(userId).select('-password');
    if (!user) throw new Error('User does not exist.');
    return user;
  }

  async findByOrg(orgId: string) {
    if (!orgId) throw new Error('Organization does not exist.');
    const user = await User.findOne({ organization: orgId }).select('-password');
    if (!user) throw new Error('User does not exist.');
    if (user.role !== 'organizer') throw new Error('User is not an organizer.');
    return user;
  }
}

export default new UserRepository();
