import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { Post as PostComponent } from "~/components/Post";
import { PostForm } from "~/components/PostForm";
import { authenticator } from "~/services/auth.server";
import { createPost, getPosts, Post } from "~/services/post.server";
import { PostSchema } from "~/services/validation";

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPosts>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, { failureRedirect: "/login" });

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
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  const formData = await request.formData();
  const rawTitle = formData.get("title");
  const rawBody = formData.get("body");

  const result = PostSchema.safeParse({
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
    authorId: user?.id || Math.random().toString().slice(0, 8),
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
