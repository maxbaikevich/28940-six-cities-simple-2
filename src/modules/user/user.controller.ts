import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {ConfigInterface} from '../../common/config/config.interface.js';
import { Component } from '../../types/component.type.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { UserServiceInterface } from './user-service.interface.js';
import { StatusCodes } from 'http-status-codes';
import UserResponse from './response/user.response.js';
import { fillDTO } from '../../utils/common.js';
import CreateUserDto from './dto/create-user.dto.js';
import LoginUserDto from './dto/login-user.dto.js';
import HttpError from '../../common/errors/http-error.js';

@injectable()
export default class UserController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.UserServiceInterface) private readonly userService: UserServiceInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for UserController...');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/register', method: HttpMethod.Post, handler: this.create});
    this.addRoute({path: '/login', method: HttpMethod.Post, handler: this.login});
  }

  public async index(_req: Request, res: Response): Promise <void> {
    console.log('---index---');
    const users = await this.userService.find();
    const userResponse = fillDTO(UserResponse, users);
    this.send(res, StatusCodes.OK, userResponse);

  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>,
    res: Response):  Promise<void> {
    const existUser = await this.userService.findOrCreate(body, this.config.get('SALT'));
    if(existUser === null) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email ${body.email} exists.`,
        'UserController'
      );
    }
    const userResponse = fillDTO(UserResponse, existUser);
    this.send(res, StatusCodes.CREATED, userResponse);
  }

  public async login(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, LoginUserDto>,
    _res:Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);
    if(!existsUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email ${body.email}`
      );
    }

    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implrmrnyed',
      'UserController',
    );
  }

}
