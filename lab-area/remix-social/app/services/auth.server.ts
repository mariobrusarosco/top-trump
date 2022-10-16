import type { User } from "@prisma/client";
import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { commitSession, destroySession, getSession } from "./session.service";
import { userLogin } from "./user.server";
import { LoginSchema } from "./validation";

export type SessionUser = Omit<User, "hashedPassword">;

export const authenticator = new Authenticator<SessionUser>({
  getSession,
  commitSession,
  destroySession,
});

export const USER_LOGIN_STRATEGY = "user-login_strategy";

authenticator.use(
  new FormStrategy(async ({ form, context }) => {
    const rawEmail = form.get("email");
    const rawPassword = form.get("password");

    const { email, password } = LoginSchema.parse({
      email: rawEmail,
      password: rawPassword,
    });

    console.log("parsed data");
    const user = await userLogin(email, password);
    console.log("logged user in", { user });
    return user;
  }),
  USER_LOGIN_STRATEGY
);
