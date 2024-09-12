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
    if (!user.role.includes("Organizer")) throw new Error('User is not an organizer.');
    return user;
  }

  async updateRole(userId: string, role: string) {
    const user = await this.findById(userId);
    const validRoles = ['User', 'Organizer'];

    if (role === 'Admin') throw new Error('Cannot update user to admin role.');
    // role must be either 'User' or 'Organizer'
    if (!validRoles.includes(role)) throw new Error('Invalid role.');
    
    user.role[0] = role;
    return await user.save();
  }
}

export default new UserRepository();
