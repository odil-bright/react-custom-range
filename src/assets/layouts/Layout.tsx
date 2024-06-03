import { ReactNode } from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header className="header">
        <p>Prueba técnica - Odil Bright</p>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
