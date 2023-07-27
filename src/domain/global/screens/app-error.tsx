import { useRouteError } from "react-router-dom";
import { AppRouterError } from "../typing/interfaces-and-types";

export const AppErrorScreen = () => {
  const error = useRouteError() as AppRouterError;
  console.log(error);

  return (
    <div>
      <h1>Oops!</h1>
      <h2>Sorry, unexpected error</h2>
      <h3>{error.statusText || error.message}</h3>
    </div>
  );
};
