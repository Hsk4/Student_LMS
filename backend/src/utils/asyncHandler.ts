import type { Request, Response, NextFunction } from 'express';


type RequestHandlerType = (req: Request, res: Response, next: NextFunction) => Promise<unknown> | void;

const asyncHandler = (requestHandler: RequestHandlerType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch((err) => next(err)); 
    };
};

export default asyncHandler ;