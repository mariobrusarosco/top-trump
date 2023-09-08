import { db } from "@/server-side/db/prisma";
import { User } from "@clerk/nextjs/server";

export const getMemberById = async (authenticatedId: string) => {
  return await db.member.findUnique({ where: { userId: authenticatedId } });
};
