import { inject, injectable } from 'inversify';
import { LoggerInterface } from '../common/logger/logger.interface.js';
import { ConfigInterface } from '../common/config/config.interface.js';
import { Component } from '../types/component.type.js';
import { getURI } from '../utils/db.js';
import { DatabaseInterface } from '../common/database/database.interface.js';
@injectable()
export default class application {

  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface,
    @inject(Component.DatabaseInterface) private databaseClient: DatabaseInterface
  ) {}

  public async init() {
    this.logger.info('Application initialization...');
    this.logger.info(`Get value from env PORT ${this.config.get('PORT')}`);
    this.logger.info(`DB_HOST === ${this.config.get('DB_HOST')}`);

    const uri = getURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME')
    );
    await this.databaseClient.connect(uri);
  }
}
