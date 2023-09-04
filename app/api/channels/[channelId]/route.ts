import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { channelId: string } }
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);

    if (!profile) return new NextResponse("[UNAUTHORIZED]", { status: 401 });

    const updatedServer = await db.server.update({
      where: {
        id: searchParams.get("serverId") ?? "",
        members: {
          some: {
            profileId: profile.id,
            role: { in: [MemberRole.ADMIN, MemberRole.MODERATOR] },
          },
        },
      },
      data: {
        channels: {
          delete: {
            id: params.channelId,
            name: { not: "general" },
          },
        },
      },
    });

    return NextResponse.json(updatedServer);
  } catch (error) {
    return new NextResponse("[CHANNEL DELETE]", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { channelId: string } }
) {
  try {
    const profile = await currentProfile();
    const { name, type } = await req.json();
    const { searchParams } = new URL(req.url);

    if (!profile) return new NextResponse("[UNAUTHORIZED]", { status: 401 });

    const updatedServer = await db.server.update({
      where: {
        id: searchParams.get("serverId") ?? "",
        members: {
          some: {
            profileId: profile.id,
            role: { in: [MemberRole.ADMIN, MemberRole.MODERATOR] },
          },
        },
      },
      data: {
        channels: {
          update: {
            where: {
              id: params.channelId,
              NOT: { name: "general" },
            },
            data: { name, type },
          },
        },
      },
    });

    return NextResponse.json(updatedServer);
  } catch (error) {
    return new NextResponse("[CHANNEL PATCH]", { status: 500 });
  }
}
