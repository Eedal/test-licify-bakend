import { NextFunction, Request, Response } from "express";
import { UserI, UserModel } from "../models/User";
import { ErrorException } from "../error-handler/error-exception";
import { ErrorCode } from "../error-handler/error-code";
import { ulid } from "ulid";
import { comparePassword, passwordHash } from "../auth/password-hash";
import { generateAuthToken } from "../auth/jwt";

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  const userExists: UserI | null = await UserModel.findOne({ email: email });

  if (!userExists) {
    next(new ErrorException(ErrorCode.Unauthenticated));
  } else {
    const validPassword = comparePassword(password, userExists.password);
    if (!validPassword) {
      next(new ErrorException(ErrorCode.Unauthenticated));
    }

    const token = generateAuthToken(userExists);

    res.send({ token });
  }
};
