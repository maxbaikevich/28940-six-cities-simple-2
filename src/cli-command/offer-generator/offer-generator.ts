import {generateRandomValue, getRandomItems, getRandomItem} from '../../utils/random.js';
import {OfferGeneratorInterface} from '../offer-generator/offer-generatoe.interface.js';
import {MockData} from '../../types/mock-data.type.js'

const MIN_PRICE = 500;
const MAXX_PRICE = 2000;

export default class OfferGenerate implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const titles =  getRandomItem<string>(this.mockData.titles).join(';');
    return [titles].join('/t');
  }
}
