import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { errorJson } from "../utils/jsonResponses";

export const jsonErrorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(400).send(errorJson(err.message));
};

export default jsonErrorHandler;
