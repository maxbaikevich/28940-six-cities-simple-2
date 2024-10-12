import { NextFunction, Request, Response } from 'express';

export interface ExeptionFilterInterface {
  catch(error: Error, req: Request, res: Response, next: NextFunction): void;
}

