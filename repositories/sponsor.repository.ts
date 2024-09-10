import { default as Sponsor } from '../models/sponsor.model';
import { SponsorDocument } from '../types/sponsor';
import { CreateSponsorDto, AddFundingDto } from '../common/dto/sponsor.dto';
import userRepository from '../repositories/user.repository';

// ------------- awaiting for the event repository -------------
import mongoose from 'mongoose';
const mockEventId = new mongoose.Types.ObjectId("66e00acbc81b82f9f4b736a7");
// -------------------------------------------------------------

class SponsorRepository {
  async getAllSponsors(): Promise<SponsorDocument[]> {
    return await Sponsor.find().exec();
  }

  async getSponsorById(id: string): Promise<SponsorDocument> {
    const result = await Sponsor.findById(id).exec();
    if (!result) {
      throw new Error('Sponsor not found');
    }
    return result;
  }

  async getSponsorByUser(userId: string): Promise<SponsorDocument[]> {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    const result = await Sponsor.find({ user }).select('-user').exec();
    if (!result) {
      throw new Error('Sponsor not found');
    }
    return result;
  }

  async getSponsorByEvent(eventId: string): Promise<SponsorDocument[]> {
    // ------------- awaiting for the event repository -------------
    // const event = await eventRepository.getEventById(eventId);
    // if (!event) {
    //   throw new Error('Event not found');
    // }
    // -------------------------------------------------------------
    const result = await Sponsor.find({ event: mockEventId }).select('-event').exec();
    if (!result) {
      throw new Error('Sponsor not found');
    }
    return result;
  }

  async getSponsorByEventAndUser(userId: string, eventId: string): Promise<SponsorDocument> {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // ------------- awaiting for the event repository -------------
    // const event = await eventRepository.getEventById(eventId);
    // if (!event) {
    //   throw new Error('Event not found');
    // }
    // -------------------------------------------------------------

    const result = await Sponsor.findOne({ event: mockEventId, user}).exec();
    if (!result) {
      throw new Error('Sponsor not found');
    }
    return result
  }

  async createSponsor(create: CreateSponsorDto): Promise<SponsorDocument> {
    const user = await userRepository.findById(create.userId);
    if (!user) {
      throw new Error('User not found');
    }

    // ------------- awaiting for the event repository -------------
    // const event = await eventRepository.getEventById(create.eventId);
    // if (!event) {
    //   throw new Error('Event not found');
    // }
    // -------------------------------------------------------------

    const sponsor = new Sponsor({
      user,
      event: mockEventId, // awaiting for the event repository
      funding: create.funding,
    });

    return await sponsor.save();
  }

  async addFunding(id: string, updates: AddFundingDto): Promise<SponsorDocument> {
    const user = await userRepository.findById(updates.userId);
    if (!user) {
      throw new Error('User not found');
    }

    // ------------- awaiting for the event repository -------------
    // const event = await eventRepository.getEventById(updates.eventId);
    // if (!event) {
    //   throw new Error('Event not found');
    // }
    // -------------------------------------------------------------
    
    const sponsor = await Sponsor.findById(id).exec();
    if (!sponsor) {
      throw new Error('Sponsor not found');
    }

    sponsor.funding += updates.funding;
    return await sponsor.save();
  }
}

export default new SponsorRepository();
