import cripto from 'crypto';
import {CitiesName} from '../types/sity.type.enum.js';
import {HouseType} from '../types/house.type.enum.js';
import {Offer} from '../types/offer.type.js';
import {Comforts} from '../types/comfort.type.enum.js';
import {UserRole} from '../types/user.type.enum.js';
import { plainToInstance } from 'class-transformer';
import { ClassConstructor } from 'class-transformer';
export const createOffer = (row:string)=> {
  const tokens = row.replace('\n', '').split('\t');
  const [title, description, date, city, previewImage, photos, isPremium, isFavorite, houseType, numberRooms, numberGuests, rentPrice, listAmenities, name, email, avatar, userType,  latitude, longitude] = tokens;
  return {
    title,
    description,
    date: new Date(date),
    city: CitiesName[city as 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf'],
    previewImage,
    photosHouses: photos.split(';').map((photo)=>(photo)),
    isPremium: JSON.parse(isPremium),
    isFavorite: Number(isFavorite),
    houseType: HouseType[houseType as 'Room' | 'Apartment' | 'House' | 'Hotel'],
    numberRooms: Number(numberRooms),
    numberGuests: Number(numberGuests),
    rentPrice:Number(rentPrice),
    listAmenities: listAmenities.split(';').map((item)=>(Comforts[item as 'Breakfast' | 'Conditioning' | 'Workspace' | 'Baby' | 'Washer' | 'Towels' | 'Fridge'])),
    user:{name, email, avatar, userType: UserRole[userType as 'Default' | 'Pro']},
    locations:{latitude: Number(latitude), longitude: Number(longitude)}
  } as Offer;
};
export const getErrorMassage = (error: unknown): string => error instanceof Error ? error.message : '';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = cripto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};

export const fillDTO = <T, V>(someDTO: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDTO, plainObject, {excludeExtraneousValues: true});

export const createErrorObject = (message: string) => ({
  error: message,
});

