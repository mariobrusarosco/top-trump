import { Outlet } from "react-router-dom";

export const AppRoot = () => {
  return (
    <>
      <div id="app">
        <Outlet />
      </div>
    </>
  );
};

export default AppRoot;
