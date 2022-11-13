import { Link, useLoaderData, Outlet } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import type { Post } from "~/models/post.server";
import { getPosts } from "~/models/post.server";

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPosts>>;
};

export const loader: LoaderFunction = async () => {
  const posts = await getPosts();

  return json<LoaderData>({ posts });
};

export default function Admin() {
  const { posts } = useLoaderData() as LoaderData;

  await new Promise((res) => setTimeout(res, 3000))

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="my-6 mb-2 border-b-2 text-center text-3xl">Blog Admin</h1>
      <div className="grid grid-cols-4 gap-6">
        <nav className="col-span-4 md:col-span-1">
          <ul>
            {posts.map((post) => (
              <li key={post.slug}>
                <Link to={post.slug} className="text-blue-600 underline">
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <main className="col-span-4 md:col-span-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
