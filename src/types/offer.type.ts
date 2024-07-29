
import {CitiesName} from './sity.type.enum.js';
import {HouseType} from './house.type.enum.js';
import {Comforts} from './comfort.type.enum.js';
import {Coordinates} from './coorfinates.type.js';
import {User} from './user.type.js';

export type Offer = {
    title: string;
    description: string;
    date: Date;
    city: CitiesName;
    previewImage: string;
    photosHouses: string[];
    isPremium: boolean;
    isFavorite: number;
    houseType: HouseType;
    numberRooms: number;
    numberGuests: number;
    rentPrice: number;
    listAmenities: Comforts[];
    user: User;
    locations: Coordinates;
  }
