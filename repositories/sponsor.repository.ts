import { CreateSponsorDto, UpdateSponsorDto } from '../common/dto/sponsor.dto';
import sponsorModel from '../models/sponsor.model';
import { SponsorDocument } from '../types/sponsor.d';
import BaseRepository from './entity.repository';

class SponsorRepository extends BaseRepository<SponsorDocument> {
  constructor() {
    super(sponsorModel);
  }

  async getAllSponsors(): Promise<SponsorDocument[]> {
    return await this.model.find().populate('user').populate('event').exec();
  }

  async getSponsorById(id: string): Promise<SponsorDocument> {
    return await this.model
      .findById(id)
      .populate('user')
      .populate('event')
      .exec();
  }

  async getSponsorsByUserId(userId: string): Promise<SponsorDocument[]> {
    return await this.model.find({ user: userId }).exec();
  }

  async getSponsorsByEventId(eventId: string): Promise<SponsorDocument[]> {
    return await this.model.find({ event: eventId }).exec();
  }

  async getSponsorByUserAndEvent(userId: string, eventId: string): Promise<SponsorDocument> {
    return await this.model.findOne({ user: userId, event: eventId }).exec();
  }

  async createSponsor(create: CreateSponsorDto): Promise<SponsorDocument> {
    const newSponsor = new this.model(create);
    return await newSponsor.save();
  }

  async updateSponsor(
    id: string,
    updates: UpdateSponsorDto
  ): Promise<SponsorDocument> {
    const sponsor = await this.model
      .findByIdAndUpdate(id, updates, {
        new: true,
      })
      .exec();
    if (!sponsor) {
      throw new Error('Update sponsor failed');
    }

    return sponsor;
  }

  async deleteSponsor(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }
}

export default new SponsorRepository();
