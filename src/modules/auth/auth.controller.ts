import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = await authService.signIn(req.body);
    res.send({ token });
  } catch (error) {
    next(error);
  }
};
