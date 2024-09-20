import { default as Sponsor } from '../models/sponsor.model';
import { SponsorDocument } from '../types/sponsor';
import { CreateSponsorDto, UpdateSponsorDto } from '../common/dto/sponsor.dto';

class SponsorRepository {
  async getAll(): Promise<SponsorDocument[]> {
    return await Sponsor.find().exec();
  }

  async getById(id: string): Promise<SponsorDocument> {
    const result = await Sponsor.findById(id).exec();
    if (!result) {
      throw new Error('Sponsor not found');
    }
    return result;
  }

  async getByUserId(userId: string): Promise<SponsorDocument[]> {
    return await Sponsor.find({ user: userId }).exec();
  }

  async getByEventId(id: string): Promise<SponsorDocument[]> {
    return await Sponsor.find({ event: id }).exec();
  }

  async create(create: CreateSponsorDto): Promise<SponsorDocument> {
    const newSponsor = new Sponsor(create);
    return await newSponsor.save();
  }

  async update(id: string, updates: UpdateSponsorDto): Promise<SponsorDocument> {
    const sponsor = await Sponsor.findByIdAndUpdate(id, updates, { new: true }).exec();
    if (!sponsor) {
      throw new Error('Update sponsor failed');
    }

    return sponsor;
  }

  async delete(id: string): Promise<void> {
    await Sponsor.findByIdAndDelete(id).exec();
  }
}

export default new SponsorRepository();
