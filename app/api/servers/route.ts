import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 as uuidV4 } from "uuid";

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json();
    const profile = await currentProfile();

    if (!profile) return new NextResponse("[INTERNAL ERROR]", { status: 404 });

    const server = await db.server.create({
      data: {
        profileId: profile.id,
        imageUrl,
        inviteCode: uuidV4(),
        name,
        channels: {
          create: [
            {
              name: "general",
              profileId: profile.id,
            },
          ],
        },
        members: {
          create: [
            {
              role: MemberRole.ADMIN,
              profileId: profile.id,
            },
          ],
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVERS_POST]: ", error);
    return new NextResponse("[INTERNAL ERROR] - [SERVERS_POST]", {
      status: 500,
    });
  }
}
