import mongoose from 'mongoose';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.type.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import { DatabaseInterface } from './database.interface.js';

@injectable()
export default class DatabaseService implements DatabaseInterface {
  constructor (
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
  ){}

  public async connect(url: string): Promise<void> {
    this.logger.info('Try to connect to MongoDB...');
    await mongoose.connect(url);
    this.logger.info('Database connection established.');
  }

  public async disconnect(): Promise<void> {
    await mongoose.disconnect();
    this.logger.info('Database connection closed');
  }
}
