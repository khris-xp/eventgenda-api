import { Document, Model } from 'mongoose';
import { CreateEntityDto, UpdateEntityDto } from '../common/dto/entity.dto';

class BaseRepository<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async getAll() {
    return await this.model.find();
  }

  async getById(id: string) {
    return await this.model.findById(id);
  }

  async create(create: CreateEntityDto) {
    const newEntity = new this.model(create);
    return await newEntity.save();
  }

  async update(id: string, updates: UpdateEntityDto) {
    return await this.model.findByIdAndUpdate(id, updates, { new: true });
  }

  async delete(id: string) {
    return await this.model.findByIdAndDelete(id);
  }
}

export default BaseRepository;
