
import { Offer } from '../../types/offer.type.js';
import { FileReaderInterface } from './file.reader.interface.js';
import {CitiesName} from '../../types/sity.type.enum.js';
import {HouseType} from '../../types/house.type.enum.js';
import {Comforts} from '../../types/comfort.type.enum.js';
import {UserRole} from '../../types/user.type.enum.js';
import { readFileSync } from 'fs';


export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';
  constructor(public filename: string) { }

  public read():void {
    this.rawData = readFileSync(this.filename, {encoding: 'utf-8',});
  }

  public toArray(): Offer[] {
    if(!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([title, description, date, city, previewImage, photosH, isPremium, isFavorite, houseType, numberRooms, numberGuests, rentPrice, listAmenities, name, email, avatar, password, userType,  latitude, longitude]) => ({
        title,
        description,
        date: new Date(date),
        city: CitiesName[city as 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf'],
        previewImage,
        photosHouses: photosH.split(';').map((photo)=>(photo)),
        isPremium: JSON.parse(isPremium),
        isFavorite: Number(isFavorite),
        houseType: HouseType[houseType as 'Room' | 'Apartment' | 'House' | 'Hotel'],
        numberRooms: Number(numberRooms),
        numberGuests: Number(numberGuests),
        rentPrice:Number(rentPrice),
        listAmenities: listAmenities.split(';').map((item)=>(Comforts[item as 'Breakfast' | 'AirConditioning' | 'Workspace' | 'BabySeat' | 'Washer' | 'Towels' | 'Fridge'])),
        user:{name, email, avatar, password, userType: UserRole[userType as 'Default' | 'Pro']},
        locations:{latitude: Number(latitude), longitude: Number(longitude)}
      }));
  }
}
