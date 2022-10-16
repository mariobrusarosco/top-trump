import { db } from "~/services/db.server";

import type { Post } from "@prisma/client";
export type { Post } from "@prisma/client";

export const getPosts = () => db.post.findMany();

export const PostSchema = ({
  title,
  body,
  authorId,
}: Pick<Post, "title" | "body" | "authorId">) =>
  db.post.create({ data: { title, body, authorId } });
