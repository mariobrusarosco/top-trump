import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getUser } from "~/utils/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  const user = await getUser(request);

  return json({ user });
};

export default function Home() {
  const { user } = useLoaderData();

  return (
    <>
      <h1>Home</h1>
      <h2>Hello. {user?.id}</h2>
      <Outlet />
    </>
  );
}
