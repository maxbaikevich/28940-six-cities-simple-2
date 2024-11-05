import {Expose, Type} from 'class-transformer';
import {CitiesName} from '../../../types/sity.type.enum.js';
import {HouseType} from '../../../types/house.type.enum.js';
import {Comforts} from '../../../types/comfort.type.enum.js';
import {Coordinates} from '../../../types/coorfinates.type.js';
import UserResponse from '../../user/response/user.response.js';

export default class OfferResponse {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public date!: Date;

  @Expose()
  public city!: CitiesName;

  @Expose()
  public previewImage!: string;


  @Expose()
  public photosHouses?: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public isFavorite!: number;

  @Expose()
  public houseType!: HouseType;

  @Expose()
  public numberRooms!: number;

  @Expose()
  public numberGuests!: number;

  @Expose()
  public rentPrice!: number;

  @Expose()
  public listAmenities!: Comforts[];

  @Expose({name: 'userId'})
  @Type(() => UserResponse)
  public user!: UserResponse;


  @Expose()
  public locations!: Coordinates;

  @Expose()
  public commentCount!: number;
}

