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
    // const date = generateRandomValue<string>(this.mockData.cities);
    const createDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const city = getRandomItem<string>(this.mockData.cities);
    return [title, description, createDate,city,].join('/t');
  }
}
