import { db } from "@/server-side/db/prisma";
import { User } from "@clerk/nextjs/server";
import { cache } from "react";

export const fetchMemberById = cache(async (authenticatedId: string) => {
  console.log("------------fetching  a member ------");
  return await db.member.findUnique({ where: { userId: authenticatedId } });
});
