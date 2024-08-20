import { CliCommandInterface } from './cli-command.interface.js';
import TSVFileReader from '../common/file-reader/tsv-file-reader.js';
import {createOffer, getErrorMassage} from '../utils/common.js';


export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  private onLine(line: string) {
    console.log('line', line );
    const offer = createOffer(line);
    console.log(offer);
  }

  private onComplete(count: number) {
    console.log(`${count} row imported.`);
  }

  public async execute(filename: string):Promise<void> {
    const fileReader = new TSVFileReader(filename.trim());
    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);

    try {
      await fileReader.read();
    }catch(err) {
      console.log(`Can t read the file: ${getErrorMassage(err)}`);
    }
  }

}
