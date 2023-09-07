interface Props {
  children: React.ReactNode;
}

import { TableSidebar } from "@/domains/tables/components/sidebar";
import { AppSidebar } from "@/domains/shared/components/app-sidebar";

const ProtectedLayout = ({ children }: Props) => {
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
