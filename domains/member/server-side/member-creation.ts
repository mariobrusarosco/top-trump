import { SharedRoutes } from "@/domains/shared/typing/enums-interfaces";
import { db } from "@/server-side/db/prisma";
import { User } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const createMember = async (memberAuthData: User) => {
  console.log(memberAuthData);
  try {
    return await db.member.create({
      data: {
        userId: memberAuthData.id,
        email: memberAuthData.emailAddresses[0].emailAddress,
        firstName: memberAuthData.firstName ?? "",
        lastName: memberAuthData.lastName ?? "",
        lastSignInAt: memberAuthData.lastSignInAt || 0,
        profileImageUrl: memberAuthData.imageUrl,
      },
    });
  } catch (error) {
    // TODO [logging] add a logging layer here
    console.log("[ERROR] - [MEMBER] - [createMember]", error);
    return redirect(SharedRoutes.NOT_FOUND);
  }
};
