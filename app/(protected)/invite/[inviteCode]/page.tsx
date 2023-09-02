import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { MemberRole } from "@prisma/client";

interface Props {
  params: { inviteCode: string };
}

export default async function InviteScreen({ params }: Props) {
  const profile = await currentProfile();
  if (!profile) return redirectToSignIn();

  if (!params?.inviteCode) {
    return redirect("/");
  }

  const server = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: { profileId: profile.id },
      },
    },
  });

  if (server) return redirect(`/servers/${server.id}`);

  const updatedServer = await db.server.update({
    where: { inviteCode: params.inviteCode },
    data: {
      members: {
        create: {
          profileId: profile.id,
          role: MemberRole.GUEST,
        },
      },
    },
  });

  if (updatedServer) return redirect(`/servers/${updatedServer.id}`);

  return null;
}
