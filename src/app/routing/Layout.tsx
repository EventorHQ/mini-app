import { Outlet } from "react-router-dom";
import Tabbar from "./Tabbar";

export default function Layout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <Tabbar />
    </>
  );
}
