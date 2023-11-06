import {Request, Response, NextFunction} from "express";

export class ResponseError extends Error {
    status?: number
}
 
 
export const notFoundErrorHandler = (req: Request, res: Response, next: NextFunction) => {
    const error = new ResponseError();
    error.message = "Endpont not found";
    error.status = 404;
 
    next(error);
 
}

export const asyncErrorHandler = (err:ResponseError, req:Request, res:Response, next:NextFunction) => {
    res.status(err.status || 500).json({
       status: err.status || 500,
       message: err.message || "Internal Server Error" 
    })
}