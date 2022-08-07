import { Link, Outlet, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { getPostListings } from "~/models/post.server";

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPostListings>>;
};

export const loader: LoaderFunction = async () => {
  const posts = await getPostListings();

  return json<LoaderData>({ posts });
};

export default function AdminIndexRoute() {
  const { posts } = useLoaderData() as LoaderData;

  return (
    <main>
      <h1 className="border-b2 my-6 mb-2">Admin In</h1>

      <Link to={"new"}>Create new post</Link>
    </main>
  );
}
