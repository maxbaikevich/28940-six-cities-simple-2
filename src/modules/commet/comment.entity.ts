import typegoose, {getModelForClass, defaultClasses, Ref} from '@typegoose/typegoose';
import {OfferEntity} from '../../modules/offer/offer.entity.js';
import {UserEntity} from '../../modules/user/user.entity.js';

const {prop, modelOptions} = typegoose;

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'commemts'
  }
})

export class CommentEntity extends defaultClasses.TimeStamps{
  @prop({ trim: true, required: true })
  public text!: string;

  @prop({
    ref: OfferEntity,
    required: true
  })
  public offerId!: Ref<OfferEntity>;

  @prop({
    ref: () => UserEntity,
    required: true,
  })
  public userId!: Ref<UserEntity>;

  @prop({ required: true })
  public rating!: number;
}

export const CommentModel = getModelForClass(CommentEntity);
