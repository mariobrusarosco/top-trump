import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = () => {
  return [
    { title: "hello", body: "lorem ispum #1" },
    { title: "world", body: "lorem ispum #2" },
  ];
};

type Post = {
  title: string;
  body: string;
};

export default function Index() {
  const posts = useLoaderData<Post[]>();

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
