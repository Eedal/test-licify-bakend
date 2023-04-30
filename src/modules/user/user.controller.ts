import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const created = await userService.signUp(req.body);
    res.send(created);
  } catch (error) {
    next(error);
  }
};
