"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { ActionTooltip } from "@/components/action-tooltip";
import { useParams, useRouter } from "next/navigation";

interface Props {
  id: string;
  imageUrl: string;
  name: string;
}

export const NavigationItem = ({ id, imageUrl, name }: Props) => {
  const params = useParams();
  const router = useRouter();

  const isItemActive = id == params.serverId;

  const stylesForDefaultState = "group-hover:h-[20px] h-[8px]";
  const stylesForActiveState = "h-[36px]";

  const handleOnClick = () => {
    router.push(`/servers/${id}`);
  };

  return (
    <ActionTooltip side="right" align="center" label={name}>
      <button
        className="relative group flex items-center"
        onClick={handleOnClick}
      >
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
            !isItemActive && "group-hover:h-[20px] h-[8px]",
            isItemActive ? "h-[36px]" : "h-[8px]"
          )}
        ></div>
        <div
          className={cn(
            "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
            isItemActive && "bg-primary/10 text-primary"
          )}
        >
          <Image fill src={imageUrl} alt="Channel" />
        </div>
      </button>
    </ActionTooltip>
  );
};
