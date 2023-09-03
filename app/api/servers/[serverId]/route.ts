import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface DeleteParams {
  serverId: string;
}

export async function DELETE(
  req: Request,
  { params }: { params: DeleteParams }
) {
  try {
    const profile = await currentProfile();
    console.log("profile:", profile);

    if (!profile) return new NextResponse("[UNAUTHORIZED]", { status: 401 });

    const updatedServer = await db.server.deleteMany({
      where: { id: params.serverId, profileId: profile.id },
    });

    return NextResponse.json(updatedServer);
  } catch (error) {
    return new NextResponse("[serverId PATCH]", { status: 500 });
  }
}

interface PatchParams {
  serverId: string;
}

export async function PATCH(req: Request, { params }: { params: PatchParams }) {
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
}
