
import {CitiesName}from '../../types/sity.type.enum.js';
import {HouseType} from '../../types/house.type.enum.js';
import {Comforts} from '../../types/comfort.type.enum.js';
import {Coordinates} from '../../types/coorfinates.type.js';
import { UserEntity } from '../user/user.entity.js';
import typegoose, {getModelForClass, defaultClasses, Ref} from '@typegoose/typegoose';


const {prop, modelOptions} = typegoose;

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})

export class OfferEntity extends defaultClasses.TimeStamps{

  @prop({required: true, trim: true,})
  public title!: string;

  @prop({required: true, trim: true,})
  public description!: string;

  @prop()
  public date!: Date;

  @prop(
    {
      type: () => String,
      enum: CitiesName
    }
  )
  public city!: CitiesName;

  @prop()
  public previewImage!: string;


  @prop() // requires explicit setting of "PropType"
  public photosHouses?: string[];

  @prop()
  public isPremium!: boolean;

  @prop()
  public isFavorite!: number;

  @prop(
    {
      type: () => String,
      enum: HouseType
    }
  )
  public houseType!: HouseType;

  @prop(
    {
      required: true,
      type: () => Number,
    }
  )
  public numberRooms!: number;

  @prop(
    {
      required: true,
      type: () => Number,
      default: 0
    }
  )
  public numberGuests!: number;

  @prop()
  public rentPrice!: number;

  @prop(
    {
      enum: Comforts,
      type: () => String
    }
  )
  public listAmenities!: Comforts[];

  @prop(
    {
      required: true,
      ref: UserEntity,
    }
  )
  public userId!: Ref<UserEntity>;

  @prop()
  public locations!: Coordinates;

  @prop({default: 0})
  public commentCount!: number;
}

export const OfferModel = getModelForClass(OfferEntity);
