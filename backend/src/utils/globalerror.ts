import type { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import ApiError from "./ApiError";
import logger from "./logger";


const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    
    let statusCode = 500;
    let message = "Internal Server Error";
    let errors: unknown[] = [];

    
    if (err instanceof ApiError) {
        statusCode = err.statusCode;
        message = err.message;
    } 
    else if (err instanceof Error) {
        message = err.message;
    }
    logger.error(`${statusCode} - ${message} - ${req.method} - ${req.url}`);

    res.status(statusCode).json({
        success: false,
        message,
        errors,
        stack: process.env.NODE_ENV === "development" ? (err instanceof Error ? err.stack : null) : null
    });
};

export default globalErrorHandler;