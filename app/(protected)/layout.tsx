interface Props {
  children: React.ReactNode;
}

import { TableSidebar } from "@/domains/tables/components/sidebar";
import { AppSidebar } from "@/domains/shared/components/app-sidebar";
import {
  auth,
  currentUser,
  redirectToSignIn,
  redirectToSignUp,
} from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/server-side/db/prisma";
import { AuthRoutes } from "@/domains/auth/typing/enums-interfaces";
import { getMemberById } from "@/domains/auth/server-side/queries";

const ProtectedLayout = async ({ children }: Props) => {
  const authenticatedMember = await currentUser();

  if (!authenticatedMember) return redirectToSignIn();

  const member = await getMemberById(authenticatedMember.id);

  if (!member) return redirect(AuthRoutes.REGISTER);

  return (
    <div className="grid grid-cols-12 h-full">
      <AppSidebar />
      <TableSidebar />
      <main className="container col-span-8 lg:col-span-9 bg-red-200">
        {children}
      </main>
    </div>
  );
};

export default ProtectedLayout;
