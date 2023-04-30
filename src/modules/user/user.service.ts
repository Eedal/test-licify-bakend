import { passwordHash } from "../../modules/auth/password-hash";
import { ErrorCode } from "../../error-handler/error-code";
import { ErrorException } from "../../error-handler/error-exception";
import { UserI, UserModel } from "../../models/User";

export const userService = {
  signUp: async (user: UserI) => {
    const { email, name, password } = user;

    const userExists = await UserModel.findOne({ email: email });

    if (!!userExists) {
      throw new ErrorException(ErrorCode.DuplicateEntityError, { email });
    }

    const hash = passwordHash(password);
    const newUser: UserI = {
      email,
      name,
      password: hash,
    };

    try {
      await UserModel.create(newUser);
      return { done: true };
    } catch (error) {
      throw new ErrorException(ErrorCode.DuplicateEntityError, { email });
    }
  },
};
