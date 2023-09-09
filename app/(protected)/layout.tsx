interface Props {
  children: React.ReactNode;
}

import { TableSidebar } from "@/domains/tables/components/sidebar";
import { AppSidebar } from "@/domains/shared/components/app-sidebar";
import { redirect } from "next/navigation";
import { AuthRoutes } from "@/domains/auth/typing/enums-interfaces";
import { MemberQueries } from "@/domains/member/server-side/queries";
import { Suspense } from "react";

const ProtectedLayout = async ({ children }: Props) => {
  const member = await MemberQueries.fetchMember();

  if (member === null) return redirect(AuthRoutes.REGISTER);

  return (
    <div className="grid grid-cols-12 h-full">
      <Suspense fallback={<h2>Loading...</h2>}>
        <AppSidebar />
        <TableSidebar />
        <main className="container col-span-8 lg:col-span-9 bg-red-200">
          {children}
        </main>
      </Suspense>
    </div>
  );
};

export default ProtectedLayout;
