import { default as Sponsor } from '../models/sponsor.model';
import { SponsorDocument } from '../types/sponsor';

class SponsorRepository {
    async create(sponsor: SponsorDocument): Promise<SponsorDocument> {
        return await Sponsor.create(sponsor);
    }
}