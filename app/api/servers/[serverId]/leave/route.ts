import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface ParamsProps {
  serverId: string;
}

export async function PATCH(req: Request, { params }: { params: ParamsProps }) {
  try {
    const profile = await currentProfile();

    if (!profile) return new NextResponse("[UNAUTHORIZED]", { status: 404 });

    // const { serverId } = params.get("serverId");
    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: { not: profile.id },
        members: {
          some: { profileId: profile.id },
        },
      },
      data: {
        members: {
          deleteMany: {
            profileId: profile.id,
          },
        },
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVERS_POST Leave]: ", error);
    return new NextResponse("[INTERNAL ERROR] - [SERVERS_POST]", {
      status: 500,
    });
  }
}
