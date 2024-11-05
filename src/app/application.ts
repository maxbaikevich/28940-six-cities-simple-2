import { inject, injectable } from 'inversify';
import { LoggerInterface } from '../common/logger/logger.interface.js';
import { ConfigInterface } from '../common/config/config.interface.js';
import { Component } from '../types/component.type.js';
import { getURI } from '../utils/db.js';
import { DatabaseInterface } from '../common/database/database.interface.js';
import express, {Express} from 'express';
import { ControllerInterface } from '../common/controller/controller.interface.js';
import { ExeptionFilterInterface } from '../common/errors/exception-filter.interface.js';
@injectable()
export default class application {
  private expressApp: Express;
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface,
    @inject(Component.DatabaseInterface) private databaseClient: DatabaseInterface,
    @inject(Component.UserController) private userController: ControllerInterface,
    @inject(Component.OfferController) private offerController: ControllerInterface,
    @inject(Component.ExeptionFilterInterface) private exeptionFilter: ExeptionFilterInterface,
  ) {
    this.expressApp = express();
  }

  public initRoutes() {
    this.expressApp.use('/user', this.userController.router);
    this.expressApp.use('/offers', this.offerController.router);
  }

  public initMiddelewaer() {
    this.expressApp.use(express.json());
    this.expressApp.use(
      '/upload',
      express.static(this.config.get('UPLOAD_DIRECTORY'))
    );
  }

  public initExeptionFilters(){
    this.expressApp.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }

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
    this.initMiddelewaer();
    this.initRoutes();
    this.initExeptionFilters();
    this.expressApp.listen(this.config.get('PORT'));
    this.logger.info(`Server started on http://localhost:${this.config.get('PORT')}`);
  }
}
