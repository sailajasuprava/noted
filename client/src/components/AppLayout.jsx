import { Outlet } from "react-router-dom";
import Footer from "./v2/Footer";
import Navbar from "./v2/Navbar";

function AppLayout() {
  return (
    <div className="flex flex-col overflow-hidden min-h-screen ">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
