import NavigationSidebar from "@/components/navigation/navigation-sidebar/navigation-sidebar";

interface Props {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: Props) => {
  return (
    <div className="h-full">
      <div className="md:flex hidden h-full w-[72px] z-30 flex-col fixed inset-y-0">
        <NavigationSidebar></NavigationSidebar>
      </div>
      <main className="md:pl-[72px] h-full">{children}</main>
    </div>
  );
};

export default ProtectedLayout;
