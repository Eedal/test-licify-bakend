import { generateAuthToken } from "./jwt";
import { comparePassword } from "./password-hash";
import { ErrorCode } from "../../error-handler/error-code";
import { ErrorException } from "../..//error-handler/error-exception";
import { UserI, UserModel } from "../../models/User";

export type CredentialsUser = Pick<UserI, "email" | "password">;

export const authService = {
  signIn: async (credentials: CredentialsUser) => {
    const { email, password } = credentials;

    const userExists: UserI | null = await UserModel.findOne({ email: email });

    if (!userExists) {
      throw new ErrorException(ErrorCode.Unauthenticated);
    } else {
      const validPassword = comparePassword(password, userExists.password);
      if (!validPassword) {
        throw new ErrorException(ErrorCode.Unauthenticated);
      }

      const token = generateAuthToken(userExists);

      return token;
    }
  },
};
