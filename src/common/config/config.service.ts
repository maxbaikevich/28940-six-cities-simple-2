import { ConfigInterface } from './config.interface.js';
import {config} from 'dotenv';
import { LoggerInterface } from '../logger/logger.interface.js';
import { configSchema, ConfigSchema } from './config.schema.js';


export default class ConfigService implements ConfigInterface {
  private config: ConfigSchema;
  private logger: LoggerInterface;

  constructor(logget: LoggerInterface) {
    this.logger = logget;

    const parsedOutput = config();
    if(parsedOutput.error) {
      throw new Error('Can\'t read .env file. Perhaps the file does not exists.');
    }

    // this.config = <DotenvParseOutput> parsedOutput.parsed;
    configSchema.load({});
    configSchema.validate({allowed: 'strict', output: this.logger.info});
    this.config = configSchema.getProperties();
    this.logger.info('.env file found and successfully parsedf!');
  }


  public get<T extends keyof ConfigSchema>(key: T){
    return this.config[key];
  }
}

