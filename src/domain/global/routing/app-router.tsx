import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import AppLayout from "../components/app-layout";
import { DashboardScreen } from "../../dashboard/screens/dashboard";
import { AppErrorScreen } from "../screens/app-error";
import AppRoot from "../components/root";
import { LandingScreen } from "../../landing/screen/landing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppRoot />,
    errorElement: <AppErrorScreen />,
    children: [
      {
        index: true,
        element: <DashboardScreen />,
      },
      {
        path: "dashboard",
        element: <DashboardScreen />,
      },
    ],
  },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
