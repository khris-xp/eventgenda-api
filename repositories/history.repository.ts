import { default as History} from '../models/history.model';
import { HistoryDocument } from '../types/history';
import { CreateHistoryDto, UpdateHistoryDto } from '../common/dto/history.dto';
import BaseRepository from './entity.repository';
import categoryRouter from '../routes/category.route';

class historyRepository {
    async getAllHistories(): Promise<HistoryDocument[]> {
        return await History.find().exec();
    }

    async getHistoryById(id: string): Promise<HistoryDocument>{
        const result = await History.findById(id).exec();

        if (result === null) {
            throw new Error('History not found');
    }
    return result;
}
    async getHistoryByUser(user: string): Promise<HistoryDocument[]>{
        const result = History.find( {user : user} ).exec();

        if (result === null){
            throw new Error('History not found');
        }

        return result;
    }

    async createHistory(create: CreateHistoryDto): Promise<HistoryDocument> {
        const newHistory = new History(create);
        return await newHistory.save();
    }

    async updateHistory(id: string, updates: UpdateHistoryDto){
        const history = await History.findByIdAndUpdate(id, updates, {new: true }).exec();

        if (history === null){
            throw new Error('update history failed');
        }
        return history;
    }

    async deleteHistory(id: string): Promise<void> {
        await History.findByIdAndDelete(id).exec();
    }
}

export default new historyRepository();