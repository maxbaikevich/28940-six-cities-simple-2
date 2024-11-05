import { validate } from 'class-validator';
import { StatusCodes } from 'http-status-codes';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { MiddelewareInterface } from '../../types/middleware.interface';
import { Request, Response, NextFunction } from 'express';

export class ValidateDtoMiddleware implements MiddelewareInterface {
  constructor(private dto: ClassConstructor<object>) {}

  public async execute({body}: Request, res: Response, next: NextFunction): Promise<void> {
    const dtoInstance = plainToInstance(this.dto, body);
    const errors = await validate(dtoInstance);

    if(errors.length > 0) {
      res.status(StatusCodes.BAD_REQUEST).send(errors);
      return;
    }
    next();
  }
}
