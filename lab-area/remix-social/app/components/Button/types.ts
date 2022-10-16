import type { ComponentPropsWithoutRef } from "react";

// export interface Props {
//   // type:   React.ButtonHTMLAttributes<HTMLButtonElement>
//   children: ReactNode;
// }

export type Props = ComponentPropsWithoutRef<any> & {
  as?: React.ElementType<any>;
};
