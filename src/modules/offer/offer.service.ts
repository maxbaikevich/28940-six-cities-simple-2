import { inject, injectable } from 'inversify';
import { OfferEntity } from './offer.entity';
import { DocumentType, types } from '@typegoose/typegoose';
import CreateOfferDto from './dto/create-offer.dto.js';
import { OfferServiceInteface } from './offer-service.interface.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import {Component} from '../../types/component.type.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { DEFAULT_OFFER_COUNT } from './offer.constant';
import { SortType } from '../../types/sort-type.enum';


@injectable()
export default class OfferSevice implements OfferServiceInteface {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.OfferModel) private readonly OfferModel: types.ModelType<OfferEntity>
  ){}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.OfferModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);
    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.OfferModel.findById(offerId).exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.OfferModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['userId',])
      .exec();
  }

  public async deliteById(offerId:string): Promise<DocumentType<OfferEntity> | null>{
    return this.OfferModel.findByIdAndDelete(offerId).exec();
  }

  public async find(count?:number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_OFFER_COUNT;
    return this.OfferModel
      .find()
      .sort({createdAt: SortType.Down})
      .limit(limit)
      .exec();
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.OfferModel
      .findByIdAndUpdate(offerId, {'$inc': {
        commentCount: 1,
      }}).exec();
  }
}
