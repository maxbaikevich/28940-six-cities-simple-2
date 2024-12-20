import { DocumentType } from '@typegoose/typegoose';
import CreateOfferDto from './dto/create-offer.dto.js';
import { OfferEntity } from './offer.entity.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { DocumentExistsInterface } from '../../types/document-exists.interface.js';


export interface OfferServiceInteface extends DocumentExistsInterface {
    create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
    findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
    updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
    deliteById(offerId: string): Promise<DocumentType<OfferEntity> | null>
    find(count: number):Promise<DocumentType<OfferEntity>[]>
    incCommentCount(offerId: string):Promise<DocumentType<OfferEntity> | null>
    exists(documentId: string): Promise<boolean>
}
