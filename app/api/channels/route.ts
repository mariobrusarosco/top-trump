import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface PostParams {
  params: { serverid: string };
}

export async function POST(req: Request, params: PostParams) {
  try {
    const { searchParams } = new URL(req.url);
    const { name, type } = await req.json();
    const serverId = searchParams.get("serverId") ?? "";
    const profile = await currentProfile();

    console.log({ profile });

    if (!profile) return new NextResponse("[UNAUTHORIZED]", { status: 404 });

    if (name === "general")
      return new NextResponse("Name cannot be 'general'", { status: 400 });

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      data: {
        channels: {
          create: {
            profileId: profile.id,
            name,
            type,
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    return new NextResponse("[CHANNELS POST]", { status: 500 });
  }
}
