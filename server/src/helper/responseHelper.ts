import { Response } from "express";
import { IApiResponse } from "../interfaces/ICommonResponseModel.js";

export class ResponseHandler {
  static success<T>(
    res: Response,
    message: string,
    data?: T,
    statusCode: number = 200
  ): Response<IApiResponse<T>> {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      statusCode,
    });
  }

  static error(
    res: Response,
    message: string,
    statusCode: number = 500,
    error?: any
  ): Response<IApiResponse<null>> {
    return res.status(statusCode).json({
      success: false,
      message,
      error,
      statusCode,
    });
  }
}
