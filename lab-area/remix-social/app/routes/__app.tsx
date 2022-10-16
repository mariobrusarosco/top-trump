import type { LoaderFunction, Session } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { Nav } from "~/components/Nav";
import type { SessionUser } from "~/services/auth.server";
import { authenticator } from "~/services/auth.server";

type LoaderData = {
  user: SessionUser;
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);

  console.log("[__app]", user);

  return { user };
};

export default function App() {
  const { user } = useLoaderData<LoaderData>() || {};

  console.log({ user });

  return (
    <div className="max-w-6xl mx-4 md:mx-10">
      <Nav user={user} />
      <Outlet />
    </div>
  );
}
