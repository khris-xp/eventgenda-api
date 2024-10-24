import { default as Organization } from '../models/organization.model';
import { OrganizationDocument } from '../types/organization';
import { CreateOrgDto, UpdateOrgDto } from '../common/dto/organization.dto';

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

  async create(create: CreateOrgDto): Promise<OrganizationDocument> {
    const organization = new Organization(create);
    return await organization.save();
  }

  async update(id: string, update: CreateOrgDto): Promise<OrganizationDocument> {
    const organization = await Organization.findByIdAndUpdate(id, update, { new: true }).exec();
    if (!organization) {
      throw new Error('Update organization failed');
    }
    return organization;
  }

  async updateOne(id: string, updates: Partial<UpdateOrgDto>): Promise<void> {
    await Organization.findById(id).updateOne(updates).exec();
  }

  async delete(id: string): Promise<void> {
    await Organization.findByIdAndDelete(id).exec();
  }
}

export default new OrganizationRepository();