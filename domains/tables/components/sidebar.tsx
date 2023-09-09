"use client";
import { useAuthentication } from "@/domains/auth/providers/auth-provider";
import { redirect } from "next/navigation";

export const TableSidebar = () => {
  const { member } = useAuthentication();

  return (
    <aside className="col-span-3 lg:col-span-2 flex flex-col bg-rose-400">
      <span>Olá</span>
      <span>{member?.firstName}</span>
      <button
        onClick={() => {
          redirect("/tables/asdsadsa/game/asdsa");
        }}
      >
        test
      </button>
    </aside>
  );
};
