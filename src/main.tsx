import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import { SignInScreen } from "./domain/authorization/screens/sign-in";
import { AuthenticatedLayout } from "./domain/authorization/layouts/authenticated-layout";
import { LandingScreen } from "./domain/landing";
import { DashboardScreen } from "./domain/dashboard/screens";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    element: <AuthenticatedLayout />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardScreen />,
      },
    ]
  },
  {
    path: "/sign-in",
    element: <SignInScreen />,
  },
  {
    path: "/sign-up",
    element: <SignInScreen />,
  },
  {
    path: "/intro",
    element: <LandingScreen />,
  },
]);

const root = document.getElementById("app") as HTMLElement

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);