import { default as Location } from '../models/location.model';
import { LocationDocument } from '../types/location';
import { CreateLocationDto, UpdateLocationDto } from '../common/dto/location.dto';

class LocationRepository {
  async getAllLocations(): Promise<LocationDocument[]> {
    return await Location.find().exec();
  }

  async getLocationById(id: string): Promise<LocationDocument> {
    const result = await Location.findById(id).exec();
    if (result === null) {
        throw new Error('Location not found');
    }
    return result;
  }

  async getLocationByName(name: string): Promise<LocationDocument> {
    const result = await Location.findOne({ name: name }).exec();
    if (result === null) {
        throw new Error('Location not found');
    }
    return result;
  }

  async createLocation(create: CreateLocationDto): Promise<LocationDocument> {
    const newLocation = new Location(create);
    return await newLocation.save();
  }

  async updateLocation(id: string, updates: UpdateLocationDto) {
    const location = await Location.findByIdAndUpdate(id, updates, { new: true }).exec();
    if (location === null) {
        throw new Error('Update location failed');
    }
    return location;
  }

  async deleteLocation(id: string): Promise<void> {
    await Location.findByIdAndDelete(id).exec();
  }

  async checkLocationExist(name: string): Promise<boolean> {
    const location = await Location.findOne({ name: name }).exec();
    return location !== null;
  }
}

export default new LocationRepository();
