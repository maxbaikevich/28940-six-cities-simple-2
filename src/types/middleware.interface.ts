import { NextFunction, Request, Response } from 'express';

export interface MiddelewareInterface {
    execute(req: Request, res: Response, next: NextFunction): void;
}
