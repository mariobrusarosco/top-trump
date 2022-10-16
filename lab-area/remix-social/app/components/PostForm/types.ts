import type { ComponentPropsWithRef } from "react";

export type Props = ComponentPropsWithRef<"form"> & {
  error?: {
    formError?: string[];
    fieldErrors?: {
      title?: string[];
      body?: string[];
    };
  };
  fields?: {
    title?: string;
    body?: string;
  };
};
