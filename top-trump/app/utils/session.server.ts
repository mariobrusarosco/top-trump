import bcrypt from "bcryptjs";
import { db } from "./db.server";

type LoginForm = {
  password: string;
  username: string;
};

export async function register({ password, username }: LoginForm) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    data: { passwordHash, username },
  });
  return { id: user.id, username };
}
