import {appendFile} from 'fs/promises';
import got from 'got';
import {MockData} from '../types/mock-data.type.js';
import { CliCommandInterface } from './cli-command.interface.js';
import OfferGenerate from './offer-generator/offer-generator.js';

export default class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';
  private initialDate!: MockData;

  public async execute(...parameters:string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);

    try {
      this.initialDate = await got.get(url).json();
    }catch {
      return console.log(`CAn t fetch data from ${url}`);
    }
    const offerGeneratorString = new OfferGenerate(this.initialDate);

    for(let i = 0; i < offerCount; i++ ) {
      await appendFile(filepath, `${offerGeneratorString.generate()}\n`, 'utf8');
    }
    console.log(`file ${filepath} was created!`);
  }
}
