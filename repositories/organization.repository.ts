import { default as Organization } from '../models/organization.model';
import { OrganizationDocument } from '../types/organization';
import { CreateOrgDto, UpdateOrgDto } from '../common/dto/organization.dto';
import userRepository from '../repositories/user.repository';

class OrganizationRepository {
  async getAll(): Promise<OrganizationDocument[]> {
    return await Organization.find().exec();
  }

  async getById(id: string): Promise<OrganizationDocument> {
    const result = await Organization.findById(id).exec();
    if (!result) {
      throw new Error('Organization not found');
    }
    return result;
  }

  // async getByUser(userId: string): Promise<OrganizationDocument> {
  //   const user = await userRepository.findById(userId);
  //   if (!user.organization) {
  //     throw new Error('User has no organization');
  //   }

  //   const result = await this.getById(user.organization.toString());
  //   return result;
  // }

  async create(userId: string, create: CreateOrgDto): Promise<OrganizationDocument> {
    const user = await userRepository.findById(userId);
    const result = await userRepository.updateRole(userId, 'Organizer');
    if (!result) {
      throw new Error('Update user role failed');
    }

    const organization = new Organization(create);
    await organization.save();

    user.organization = organization._id;
    await user.save();

    return organization;
  }

  async update(id: string, update: UpdateOrgDto): Promise<OrganizationDocument> {
    const organization = await Organization.findByIdAndUpdate(id, update, { new: true }).exec();
    if (!organization) {
      throw new Error('Update organization failed');
    }
    return organization;
  }

  async delete(id: string): Promise<void> {
    const user = await userRepository.findByOrg(id);
    if (user) {
      user.organization = undefined;
      const result = await userRepository.updateRole(user, 'User');
      if (!result) {
        throw new Error('Update user role failed');
      }
      await user.save();
    }
    
    await Organization.findByIdAndDelete(id).exec();
  }
}

export default new OrganizationRepository();