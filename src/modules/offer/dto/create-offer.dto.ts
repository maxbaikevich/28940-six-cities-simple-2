import {Coordinates} from '../../../types/coorfinates.type.js';
import {HouseType} from '../../../types/house.type.enum.js';
import {CitiesName} from '../../../types/sity.type.enum.js';
import {Comforts} from '../../../types/comfort.type.enum';
import {User} from '../../../types/user.type.js';

export default class CreateOfferDto {
  public title!: string;
  public description!: string;
  public date!: Date;
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
