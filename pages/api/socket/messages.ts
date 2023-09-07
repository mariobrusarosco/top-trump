import { currentProfilePages } from "@/lib/current-profile-legacy";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  //   if (req.method !== "DELETE" && req.method !== "PATCH") {
  //     return res.status(405).json({ error: "Method not allowed" });
  //   }

  try {
    const profile = await currentProfilePages(req);
    const { content, fileUrl } = req.body;
    const { serverId, channelId } = req.query;

    if (!profile) {
      console.log("---UNAUTHORIZED--- ");
      // return res.status(401).json({ message: "[UNAUTHORIZED]" });
    }

    if (!content) {
      return res.status(400).json({ message: "['content' is missing]" });
    }
    if (!channelId) {
      return res.status(400).json({ message: "['channelId' is missing]" });
    }
    if (!serverId) {
      return res.status(400).json({ message: "['serverId' is missing]" });
    }

    const server = await db.server.findFirst({
      where: {
        id: serverId as string,
        members: { some: { profileId: profile?.id } },
      },
      include: {
        members: true,
      },
    });

    if (!server) {
      return res.status(404).json({ message: "Server not found" });
    }

    const channel = await db.channel.findFirst({
      where: {
        id: channelId as string,
        serverId: serverId as string,
      },
    });

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    const member = server.members.find(
      (member) => member.profileId === profile?.id
    );

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    const message = await db.message.create({
      data: {
        content,
        fileUrl,
        channelId: channelId as string,
        memberId: member.id,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });

    const channelkey = `chat:${channel.id}:messages`;
    res?.socket?.server?.io?.emit(channelkey, message);

    console.log("------message", channelId, member.id, content);
    // console.log("------channelkey", channelkey);

    const channelkeyTet = `toma`;
    console.log("------socket Test", channelkeyTet);
    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json({ message: "[MESSAGES] internal error" });
  }
}
