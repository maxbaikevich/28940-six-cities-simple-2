import {Coordinates} from '../../../types/coorfinates.type.js';
import {HouseType} from '../../../types/house.type.enum.js';
import {CitiesName} from '../../../types/sity.type.enum.js';
import {Comforts} from '../../../types/comfort.type.enum';

export default class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public Date?: Date;
  public city?: CitiesName;
  public previewImage?: string;
  public photosHouses?: string[];
  public isPremium?: boolean;
  public isFavorite?: number;
  public houseType?: HouseType;
  public numberRooms?: number;
  public numberGuests?: number;
  public rentPrice?: number;
  public listAmenities?: Comforts[];
  public locations?: Coordinates;
}
