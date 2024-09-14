import { default as Location } from '../models/location.model';
import { LocationDocument } from '../types/location';
import { CreateLocationDto, UpdateLocationDto } from '../common/dto/location.dto';

class LocationRepository {
  async getAll(): Promise<LocationDocument[]> {
    return await Location.find().exec();
  }

  async getById(id: string): Promise<LocationDocument> {
    const result = await Location.findById(id).exec();
    if (result === null) {
        throw new Error('Location not found');
    }
    return result;
  }

  async getByName(name: string): Promise<LocationDocument> {
    const result = await Location.findOne({ name: name }).exec();
    if (result === null) {
        throw new Error('Location not found');
    }
    return result;
  }

  async create(create: CreateLocationDto): Promise<LocationDocument> {
    const newLocation = new Location(create);
    return await newLocation.save();
  }

  async update(id: string, updates: UpdateLocationDto) {
    const location = await Location.findByIdAndUpdate(id, updates, { new: true }).exec();
    if (location === null) {
        throw new Error('Update location failed');
    }
    return location;
  }

  async delete(id: string): Promise<void> {
    await Location.findByIdAndDelete(id).exec();
  }
}

export default new LocationRepository();
