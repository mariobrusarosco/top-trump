import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import NavigationAction from "@/components/navigation/navigation-action/navigation-action";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationItem } from "../navigation-item/navigation-item";
import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";

const NavigationSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) return null;

  const servers = await db.server.findMany({
    where: { members: { some: { profileId: profile.id } } },
  });

  return (
    <aside className="py-3 space-y-4 flex flex-col items-center text-primary h-full bg[#fff]">
      <NavigationAction />
      <Separator className="h-[2px] bg-zinc-200 rounded:md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
          <div key={server.id}>
            <NavigationItem
              name={server.name}
              id={server.id}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/sign-in"
          appearance={{
            elements: {
              avatarBox: "h-[48px] w-[48px]",
            },
          }}
        />
      </div>
    </aside>
  );
};

export default NavigationSidebar;
