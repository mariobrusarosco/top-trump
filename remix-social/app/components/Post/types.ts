import type { ComponentPropsWithoutRef } from "react";

export type Props = ComponentPropsWithoutRef<"div"> & {
  header?: string | null;
};

// OR, we don't need to reinvent the wheel and use:

// export type Props = {
//   header?: string | null;
//   children: ReactNode;
// };
