import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import * as core from 'express-serve-static-core';
import {Controller} from '../../common/controller/controller.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.type.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import {OfferServiceInteface} from '../../modules/offer/offer-service.interface.js';
// import {ConfigInterface} from '../../common/config/config.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import HttpError from '../../common/errors/http-error.js';
import { StatusCodes } from 'http-status-codes';
import OfferResponse from './response/offer.response.js';
import { fillDTO } from '../../utils/common.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validete-objectid.middleware.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validete-dto.middleware.js';

type ParamsGetOffer = {
    offerId: string;
}

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.OfferServiceInteface) private readonly offerService: OfferServiceInteface,

  ){
    super(logger);
    this.logger.info('Register routes for offerController...');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateOfferDto)]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });

  }

  public async show(
    {params}: Request<core.ParamsDictionary | ParamsGetOffer>,
    res: Response
  ):Promise<void> {
    const {offerId} = params;
    const offer = await this.offerService.findById(offerId);
    if(!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`,
        'offerController'
      );
    }
    this.ok(res, fillDTO(OfferResponse, offer));
  }

  public async index(_req: Request, res: Response) {
    const offers = await this.offerService.find(25);
    this.ok(res, fillDTO(OfferResponse, offers));
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string,unknown>, CreateOfferDto>,
    res: Response
  ):Promise<void> {
    const result = await this.offerService.create(body);
    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDTO(OfferResponse, offer));
  }

  public async delete(
    {params}: Request<core.ParamsDictionary | ParamsGetOffer>,
    res: Response
  ): Promise<void> {
    const {offerId} = params;
    const offer = await this.offerService.deliteById(offerId);

    if(!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`,
        'OfferController'
      );
    }
    this.noContent(res, offer);
  }

  public async update(
    {body, params}: Request<core.ParamsDictionary | ParamsGetOffer, Record<string,unknown>, CreateOfferDto>,
    res:Response
  ):Promise<void> {
    const updatedOffer = await this.offerService.updateById(params.offerId, body);

    if(!updatedOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with if ${params.offerId} not found.`,
        'OfferController'
      );
    }
    this.ok(res, fillDTO(OfferResponse, updatedOffer));
  }

}
