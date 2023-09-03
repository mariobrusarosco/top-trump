import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface PatchParams {
  imageurl: string;
  name: string;
}

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) return new NextResponse("[UNAUTHORIZED]", { status: 401 });

    const { name, imageUrl } = await req.json();

    const updatedServer = await db.server.update({
      where: { id: params.serverId, profileId: profile.id },
      data: {
        name,
        imageUrl,
      },
    });

    return NextResponse.json(updatedServer);
  } catch (error) {
    return new NextResponse("[serverId PATCH]", { status: 500 });
  }

  return NextResponse.json({ name: "nada ne" });
}
