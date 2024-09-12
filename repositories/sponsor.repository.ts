import { default as Sponsor } from '../models/sponsor.model';
import { SponsorDocument } from '../types/sponsor';
import { CreateSponsorDto } from '../common/dto/sponsor.dto';
import userRepository from '../repositories/user.repository';

// ------------- awaiting for the event repository -------------
import mongoose from 'mongoose';
const mockEventId = new mongoose.Types.ObjectId("66e00acbc81b82f9f4b736a7");
// -------------------------------------------------------------

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

  async getByUser(userId: string): Promise<SponsorDocument[]> {
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

  async getByEvent(eventId: string): Promise<SponsorDocument[]> {
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

  async getByEventAndUser(userId: string, eventId: string): Promise<SponsorDocument> {
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

  async create(userId: string, create: CreateSponsorDto): Promise<SponsorDocument> {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (!user.role.includes("User")) {
      throw new Error('Only user can fund the event');
    }

    if (user.coin < create.funding) {
      throw new Error('Not enough coin');
    }
    
    user.coin -= create.funding;
    await user.save();

    // ------------- awaiting for the event repository -------------
    // const event = await eventRepository.getEventById(create.eventId);
    // if (!event) {
    //   throw new Error('Event not found');
    // }
    // -------------------------------------------------------------

    const sponsor = new Sponsor({
      user: user._id,
      event: mockEventId, // awaiting for the event repository
      funding: create.funding,
    });

    return await sponsor.save();
  }
}

export default new SponsorRepository();
