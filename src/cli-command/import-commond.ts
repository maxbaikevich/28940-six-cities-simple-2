import { CliCommandInterface } from './cli-command.interface.js';
import TSVFileReader from '../common/file-reader/tsv-file-reader.js';
import {createOffer, getErrorMassage} from '../utils/common.js';
import { UserServiceInterface } from '../modules/user/user-service.interface.js';
import { OfferServiceInteface } from '../modules/offer/offer-service.interface.js';
// import { CommentServiceInterface } from '../modules/commet/comment-service.interface.js';
import {LoggerInterface} from '../common/logger/logger.interface.js';
import ConsoleLogger from '../common/logger/consol-loger.js';
import OfferSevice from '../modules/offer/offer.service.js';
import {OfferModel} from '../modules/offer/offer.entity.js';
import UserService from '../modules/user/user.service.js';
import {UserModel} from '../modules/user/user.entity.js';
// import { CommentModel } from '../modules/commet/comment.entity.js';
// import CommentService from '../modules/commet/comment.service.js';
import {Offer} from '../types/offer.type.js';
import { DatabaseInterface } from '../common/database/database.interface.js';
import DatabaseService from '../common/database/database.service.js';
import {getURI} from '../utils/db.js';

const DEFAULT_USER_PASSWORD = '123456';
const DEFAULT_DB_PORT = 27017;

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  private UserService!: UserServiceInterface;
  private offerSevice!: OfferServiceInteface;
  // private CommentService!: CommentServiceInterface;
  private logger!: LoggerInterface;
  private salt!: string;
  private databaseService!: DatabaseInterface;

  constructor() {
    this.onLine = this.onLine.bind(this);
    this.onComplete = this.onComplete.bind(this);
    this.logger = new ConsoleLogger();
    this.offerSevice = new OfferSevice(this.logger, OfferModel);
    this.UserService = new UserService(this.logger, UserModel);
    // this.CommentService = new CommentService(CommentModel);
    this.databaseService = new DatabaseService(this.logger);
  }

  private async onLine(line: string, resolve: () => void) {
    const offer = await createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onComplete(count: number) {
    console.log(`${count} row imported.`);
    this.databaseService.disconnect();
  }

  private async saveOffer(offer: Offer){
    const user = await this.UserService.findOrCreate({
      ...offer.user,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);
    await this.offerSevice.create({
      ...offer,
      userId: user.id
    });
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string):Promise<void> {
    const uri = getURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;
    await this.databaseService.connect(uri);
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
