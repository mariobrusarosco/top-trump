import { hashPassword } from "./auth.utils.server";
import { db } from "./db.server";

export const userSignup = async (email: string, password: string) => {
  const hashedPassword = await hashPassword(password);

  return db.user.create({
    data: { email, hashedPassword: hashedPassword, name: email },
    select: {
      email: true,
      createdAt: true,
      id: true,
      name: true,
      role: true,
      updatedAt: true,
    },
  });
};

export const checkIfUserExists = async (email: string) => {
  return (
    (await db.user.count({
      where: { email },
    })) > 0
  );
};
