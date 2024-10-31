import { PaymentDto } from '../common/dto/payment.dto';
import Payment from '../models/payment.model';
import { FilterType } from '../types/filter.d';

export default class PaymentRepository {
  static async findAll() {
    return await Payment.find().populate('user event').lean();
  }

  static async create(data: PaymentDto) {
    return await Payment.create(data);
  }

  static async findOne(filter: FilterType) {
    return await Payment.findOne(filter).populate('user event').lean();
  }

  static async findById(id: string) {
    return await Payment.findById(id).populate('user event');
  }

  static async update(id: string, data: Partial<PaymentDto>) {
    return await Payment.findByIdAndUpdate(id, data, { new: true });
  }

  static async delete(id: string) {
    return await Payment.findByIdAndDelete(id);
  }
}
