import 'reflect-metadata';
import { Container } from 'inversify';
import { LoggerInterface } from './common/logger/logger.interface.js';
import LoggerService from './common/logger/logger.service.js';
import { Component } from './types/component.type.js';
import { ConfigInterface } from './common/config/config.interface.js';
import ConfigService from './common/config/config.service.js';
import Application from './app/application.js';
import DatabaseService from './common/database/database.service.js';
import { DatabaseInterface } from './common/database/database.interface.js';
import UserService from './modules/user/user.service.js';
import { UserServiceInterface } from './modules/user/user-service.interface.js';
import { types } from '@typegoose/typegoose';
import { UserEntity, UserModel } from './modules/user/user.entity.js';
import { OfferEntity, OfferModel} from './modules/offer/offer.entity.js';
import { CommentEntity, CommentModel } from './modules/commet/comment.entity.js';


const applicationContainer = new Container();
applicationContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
applicationContainer.bind<LoggerInterface>(Component.LoggerInterface).to(LoggerService).inSingletonScope();
applicationContainer.bind<ConfigInterface>(Component.ConfigInterface).to(ConfigService).inSingletonScope();
applicationContainer.bind<DatabaseInterface>(Component.DatabaseInterface).to(DatabaseService).inSingletonScope();
applicationContainer.bind<UserServiceInterface>(Component.UserServiceInterface).to(UserService).inSingletonScope();
applicationContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
applicationContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
applicationContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);
const application = applicationContainer.get<Application>(Component.Application);
await application.init();
