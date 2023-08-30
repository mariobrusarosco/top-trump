import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex">
      <p className="text-3xl font-bold text--300">Top trump</p>
      <Button className="btn" variant="justAnExample">
        asadsad
      </Button>
      <UserButton afterSignOutUrl="/sign-in" />
    </div>
  );
}
