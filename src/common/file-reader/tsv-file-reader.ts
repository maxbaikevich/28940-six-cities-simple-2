
// import { Offer } from '../../types/offer.type.js';
import { FileReaderInterface } from './file.reader.interface.js';
// import {CitiesName} from '../../types/sity.type.enum.js';
// import {HouseType} from '../../types/house.type.enum.js';
// import {Comforts} from '../../types/comfort.type.enum.js';
// import {UserRole} from '../../types/user.type.enum.js';
import EventEmitter from 'events';
import {createReadStream} from 'fs';
// import { readFileSync } from 'fs';


export default class TSVFileReader extends EventEmitter implements FileReaderInterface {
  // private rawData = '';
  constructor(public filename: string) {
    super();
  }

  public async read():Promise <void> {
    const stream = createReadStream(this.filename, {
      highWaterMark: 16384,
      encoding: 'utf-8',
    });
    let lineRead = '';
    let endLinePosition = -1;
    let importedRowCount = 0;

    for await (const chank of stream) {
      lineRead += chank.toString();
      while((endLinePosition = lineRead.indexOf('\n')) >0){
        const completeRow = lineRead.slice(0, endLinePosition + 1);
        lineRead = lineRead.slice(++endLinePosition);
        importedRowCount++;

        this.emit('line', completeRow);
      }
    }
    this.emit('end', importedRowCount);
    // this.rawData = readFileSync(this.filename, {encoding: 'utf-8',});
  }

  // public toArray(): Offer[] {
  //   if(!this.rawData) {
  //     return [];
  //   }
  //   return this.rawData
  //     .split('\n')
  //     .filter((row) => row.trim() !== '')
  //     .map((line) => line.split('\t'))
  //     .map(([title, description, date, city, previewImage, photos, isPremium, isFavorite, houseType, numberRooms, numberGuests, rentPrice, listAmenities, name, email, avatar, password, userType,  latitude, longitude]) => ({
  //       title,
  //       description,
  //       date: new Date(date),
  //       city: CitiesName[city as 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf'],
  //       previewImage,
  //       photosHouses: photos.split(';').map((photo)=>(photo)),
  //       isPremium: JSON.parse(isPremium),
  //       isFavorite: Number(isFavorite),
  //       houseType: HouseType[houseType as 'Room' | 'Apartment' | 'House' | 'Hotel'],
  //       numberRooms: Number(numberRooms),
  //       numberGuests: Number(numberGuests),
  //       rentPrice:Number(rentPrice),
  //       listAmenities: listAmenities.split(';').map((item)=>(Comforts[item as 'Breakfast' | 'Conditioning' | 'Workspace' | 'Baby' | 'Washer' | 'Towels' | 'Fridge'])),
  //       user:{name, email, avatar, password, userType: UserRole[userType as 'Default' | 'Pro']},
  //       locations:{latitude: Number(latitude), longitude: Number(longitude)}
  //     }));
  // }
}
