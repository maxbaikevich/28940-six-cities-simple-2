// import {appendFile} from 'fs/promises';
import  TSVFileWriter from '../common/file-writer/tsv-file-writer.js'
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
    const tsvFileWriter = new TSVFileWriter(filepath);
    for(let i = 0; i < offerCount; i++ ) {
      // await appendFile(filepath, `${offerGeneratorString.generate()}\n`, 'utf8');
      await tsvFileWriter.write(offerGeneratorString.generate());
    }
    console.log(`file ${filepath} was created!`);
  }
}
