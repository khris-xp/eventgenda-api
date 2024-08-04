import { default as User } from '../models/user.model';

class UserRerpository {
  async findById(userId: string) {
    if (!userId) throw new Error('User does not exist.');
    const user = await User.findById(userId).select('-password');
    if (!user) throw new Error('User does not exist.');
    return user;
  }
}

export default new UserRerpository();
