import { DocumentType } from '@typegoose/typegoose';
import CreateOfferDto from './dto/create-offer.dto.js';
import { OfferEntity } from './offer.entity.js';


export interface OfferServiceInteface {
    create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
    findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
}
