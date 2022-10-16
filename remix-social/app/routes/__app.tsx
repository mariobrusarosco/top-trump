import type { LoaderFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { Nav } from "~/components/Nav";
import { authenticator } from "~/services/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);

  return null;
};

export default function App() {
  return (
    <div className="max-w-6xl mx-4 md:mx-10">
      <Nav />
      <Outlet />
    </div>
  );
}
