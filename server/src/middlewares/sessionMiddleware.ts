import { Request,Response,NextFunction } from "express";
import { CustomError } from "../utils/customError.js";
import { HttpStatusCode } from "../constants/statuscode/statuscode.js";
import { MESSAGES } from "../constants/messages/messages.js";
import { CustomRequest } from "../interfaces/ICustomRequest.js";



export const validateSession =(req:CustomRequest,res:Response,next:NextFunction)=>{
    const sessionId = req.headers["x-session-id"] as string;

    if (!sessionId) {
        return next(
            new CustomError(
                HttpStatusCode.BAD_REQUEST,
                MESSAGES.X_SESSION_ID_HEADER_REQUIRED
            )
        );
    }
    req.sessionId = sessionId;
    next();
}