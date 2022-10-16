import { z } from "zod";

const email = z.string().email();
const password = z.string().min(5);

export const SignupSchema = z.object({
  email,
  password,
});

export const LoginSchema = z.object({
  email,
  password,
});

export const PostSchema = z.object({
  title: z.string().optional(),
  body: z.string().min(1),
});
