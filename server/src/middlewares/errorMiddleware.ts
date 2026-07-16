import {
    Request,
    Response,
    NextFunction
  } from "express";
import { ResponseHandler } from "../helper/responseHelper.js";
import { CustomError } from "../utils/customError.js";
  
  export const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
  
    console.error(error);
  
    const statusCode = error instanceof CustomError ? error.statusCode : 500;
    const message = error.message || "Server Error";
    const details = error instanceof CustomError ? error.details : undefined;

    return ResponseHandler.error(res, message, statusCode, details);
  };