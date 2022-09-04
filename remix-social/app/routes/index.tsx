import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Post as PostComponent } from "~/components/Post";
import { PostForm } from "~/components/PostForm";
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
      <h1 className="text-3xl underline">Welcome to Remix</h1>
      <PostForm />
      <ul>
        {posts?.map((post) => (
          <li key={post.title}>
            <PostComponent header={post.title}>{post.body}</PostComponent>
          </li>
        ))}
      </ul>
    </div>
  );
}
