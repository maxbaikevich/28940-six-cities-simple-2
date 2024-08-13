import {generateRandomValue, getRandomItems, getRandomItem} from '../../utils/random.js';
import {OfferGeneratorInterface} from '../offer-generator/offer-generatoe.interface.js';
import {MockData} from '../../types/mock-data.type.js';
import dayjs from 'dayjs';


const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export default class OfferGenerate implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title =  getRandomItem<string>(this.mockData.titles);
    const description =  getRandomItem<string>(this.mockData.descriptions);
    const createDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const city = getRandomItem<string>(this.mockData.cities);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const photosHouses = getRandomItems<string>(this.mockData.images).join(';');
    const isPremium = getRandomItem<boolean>([true, false]);
    const isFavorite = generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY);
    const houseType = getRandomItem<string>(this.mockData.houseType);
    const numberRooms = generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY);
    const numberGuests = generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY);
    const rentPrice = generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY);
    const listAmenities = getRandomItems<string>(this.mockData.listAmenities).join(';');
    const name = getRandomItem<string>(this.mockData.names);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatar = getRandomItem<string>(this.mockData.avatars);
    const password = getRandomItem<string>(this.mockData.passwords);
    const userType = getRandomItem<string>(this.mockData.userTypes);
    const locations = getRandomItem<string>(this.mockData.locations);
    const [latitude, longitude] = locations.split(' ');


    return [
      title,
      description,
      createDate,
      city,
      previewImage,
      photosHouses,
      isPremium,
      isFavorite,
      houseType,
      numberRooms,
      numberGuests,
      rentPrice,
      listAmenities,
      name,
      email,
      avatar,
      password,
      userType,
      latitude,
      longitude
    ].join('\t');
  }
}
