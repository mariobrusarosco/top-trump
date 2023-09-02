import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { v4 as uuidV4 } from "uuid";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  const profile = await currentProfile();
  if (!profile) return new NextResponse("[UNAUTHORIZED]", { status: 401 });

  const serverId = params.serverId;
  if (!serverId)
    return new NextResponse("[MISSING PARAMS]: serverId", { status: 400 });

  try {
    const server = await db.server.update({
      where: { id: serverId, profileId: profile.id },
      data: { inviteCode: uuidV4() },
    });

    return NextResponse.json(server);
  } catch (error) {
    return new NextResponse("[INTERNAL ERROR]: serverId", { status: 500 });
  }
}
