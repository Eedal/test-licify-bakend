import { NextFunction, Request, Response } from "express";
import { UserI, UserModel } from "../models/User";
import { ErrorException } from "../error-handler/error-exception";
import { ErrorCode } from "../error-handler/error-code";
import { ulid } from "ulid";
import { passwordHash } from "../auth/password-hash";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, name, password } = req.body;

  const userExists = await UserModel.findOne({ email: email });

  if (!!userExists) {
    next(new ErrorException(ErrorCode.DuplicateEntityError, { email }));
  }

  const hash = passwordHash(password);
  const newUser: UserI = {
    _id: ulid(),
    email,
    name,
    password: hash,
  };

  try {
    const created = await UserModel.create(newUser);
    res.send({ done: true });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};
