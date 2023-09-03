import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      memberId: string;
    };
  }
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);

    if (!profile) return new NextResponse("[UNAUTHORIZED]", { status: 401 });

    const updatedServer = await db.server.update({
      where: {
        id: searchParams.get("serverId") ?? "",
        profileId: profile.id,
      },
      data: {
        members: {
          deleteMany: {
            id: params.memberId,
            profileId: { not: profile.id },
          },
        },
      },
      include: {
        members: { include: { profile: true }, orderBy: { role: "asc" } },
      },
    });

    return NextResponse.json(updatedServer);
  } catch (error) {
    return new NextResponse("[MEMBERS KICK]", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      memberId: string;
    };
  }
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const { role } = await req.json();

    if (!profile) return new NextResponse("[UNAUTHORIZED]", { status: 401 });

    const updatedServer = await db.server.update({
      where: {
        id: searchParams.get("serverId") ?? "",
        profileId: profile.id,
      },
      data: {
        members: {
          update: {
            where: { id: params.memberId, profileId: { not: profile.id } },
            data: { role },
          },
        },
      },
      include: {
        members: {
          include: { profile: true },
          orderBy: { role: "asc" },
        },
      },
    });

    return NextResponse.json(updatedServer);
  } catch (error) {
    return new NextResponse("[MEMBERS MEMBER ID]", { status: 500 });
  }
}
