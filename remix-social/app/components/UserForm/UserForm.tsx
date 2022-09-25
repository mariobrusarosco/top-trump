import { Form, useTransition } from "@remix-run/react";
import { Button } from "../Button";
import type { Props } from "./types";

const UserForm = ({ error, fields, ...props }: Props) => {
  const transition = useTransition();

  console.log("UserForm", { transition });
  return (
    <Form className="flex flex-col" method="post" {...props}>
      <div className="mb-4 flex flex-col">
        <label htmlFor="email" className="mb-2 text-gray-600">
          email
        </label>
        <input
          className="p-4"
          name="email"
          type="email"
          autoComplete="user-name"
          required
          placeholder="john_doe@gmail.com"
          defaultValue={fields?.email}
        />
        {error?.fieldErrors?.email && <p>{error.fieldErrors.email}</p>}
      </div>
      <div className="mb-8 flex flex-col">
        <label htmlFor="password" className="mb-2 text-gray-600">
          Password
        </label>
        <input
          defaultValue={fields?.password}
          className="p-4"
          type="password"
          name="password"
          autoComplete="current-password"
          required
        />
        {error?.fieldErrors?.password && (
          <p className="text-red-500">{error.fieldErrors.password}</p>
        )}
      </div>
      {error?.formError && <p className="text-red-500">{error?.formError}</p>}
      <Button type="submit" dissabled={transition.state !== "idle"}>
        {transition.state === "idle" ? "Login" : "Loging in..."}
      </Button>
    </Form>
  );
};

export default UserForm;
