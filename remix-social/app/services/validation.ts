import { z } from "zod";

const email = z.string().email();
const password = z.string().min(5);

export const CreateSignup = z.object({
  email,
  password,
});

export const CreatePost = z.object({
  title: z.string().optional(),
  body: z.string().min(1),
});
