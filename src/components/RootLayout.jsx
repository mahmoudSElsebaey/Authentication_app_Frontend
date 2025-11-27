import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

export default function RootLayout() {
  return (
    <div>
      <header>
        <p>Logo</p>
        <Navbar />
      </header>

      <Outlet />
    </div>
  );
}
