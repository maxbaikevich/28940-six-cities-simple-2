import {IsEnum, MinLength, MaxLength, IsDateString} from 'class-validator';
import {Coordinates} from '../../../types/coorfinates.type.js';
import {HouseType} from '../../../types/house.type.enum.js';
import {CitiesName} from '../../../types/sity.type.enum.js';
import {Comforts} from '../../../types/comfort.type.enum';
import {User} from '../../../types/user.type.js';

export default class CreateOfferDto {
  @MinLength(10, {message: 'Minimum title length must be 10'})
  @MaxLength(100, {message: 'Maximum title length must be 100'})
  public title!: string;

  @MinLength(20, {message: 'Minimum title length must be 20'})
  @MaxLength(1024, {message: 'Maximum title length must be 1024'})
  public description!: string;

  @IsDateString({}, {message: 'Post data must be valid ISI data'})
  public date!: Date;

  @IsEnum(CitiesName, {message: 'CitiesName'})
  public city!: CitiesName;

  public previewImage!: string;
  public photosHouses!: string[];
  public isPremium!: boolean;
  public isFavorite!: number;
  public houseType!: HouseType;
  public numberRooms!: number;
  public numberGuests!: number;
  public rentPrice!: number;
  public listAmenities!: Comforts[];
  public userId!: User;
  public locations!: Coordinates;
}
