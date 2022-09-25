import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { Post as PostComponent } from "~/components/Post";
import { PostForm } from "~/components/PostForm";
import type { Post } from "~/services/post.server";
import { getPosts, createPost } from "~/services/post.server";
import { CreatePost } from "~/services/validation";

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPosts>>;
};

export const loader: LoaderFunction = async () => {
  const posts = await getPosts();

  return json<LoaderData>({ posts });
};

type ActionData = {
  error: {
    formError?: string[];
  };
  fieldErrors: {
    title?: string[];
    body?: string[];
  };
  fields: {
    title?: string;
    body?: string;
  };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const rawTitle = formData.get("title");
  const rawBody = formData.get("body");

  const result = CreatePost.safeParse({
    title: rawTitle,
    body: rawBody,
  });

  if (!result.success) {
    return json(
      {
        error: result.error?.flatten(),
        fields: {
          title: rawTitle,
          body: rawBody,
        },
      },
      { status: 400 }
    );
  }

  await createPost({
    title: result?.data?.title ?? null,
    body: result?.data?.body,
    authorId: Math.random().toString().slice(0, 8),
  });

  return redirect("/");
};

export default function Index() {
  const { posts } = useLoaderData<LoaderData>();
  const formData = useActionData<ActionData>();

  return (
    <div className="flex flex-col items-center">
      <div className="mb-8">
        <PostForm
          action="/?index"
          fields={formData?.fields}
          error={formData?.error}
        />
      </div>
      <ul>
        {posts?.map((post) => (
          <li key={post.title}>
            <PostComponent header={post.title} authorName={post?.author?.email}>
              {post.body}
            </PostComponent>
          </li>
        ))}
      </ul>
    </div>
  );
}
