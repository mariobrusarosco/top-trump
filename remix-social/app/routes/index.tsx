import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { Post } from "~/services/post.server";
import { getPosts } from "~/services/post.server";

type LoaderData = {
  posts: Post[];
};

export const loader: LoaderFunction = async () => {
  const posts = await getPosts();

  return json<LoaderData>({ posts });
};

export default function Index() {
  const { posts } = useLoaderData<LoaderData>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        {posts?.map((post) => (
          <li key={post.title}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
