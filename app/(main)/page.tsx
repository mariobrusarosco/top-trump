import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import {InitialModal } from "@/components/modals/initial-modal"

export default async function Home() {
  const profile = await initialProfile()
  const server = await db.server.findFirst({
    where: { members: { some: { profileId: profile.id }}}
  })

  if(server) redirect(`/servers/${server.id}`)

  
  return (
    <div className="flex">

      <p className="text-3xl font-bold text--300">Top trump</p>
      <Button className="btn">
        Create Server
      </Button>
      <UserButton afterSignOutUrl="/sign-in" />
      <ModeToggle />
      <InitialModal />
    </div>
  );
}
