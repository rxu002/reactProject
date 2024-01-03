import { NavLink, Outlet } from "react-router-dom";
import { Logo } from "../components/Logo";

export const RootLayout = () => {
  return (
    <div>
      <nav className="navContainer">
        <Logo />
        <div className="navLinksContainer">
          <NavLink to="/" className="navLink">
            My Collection
          </NavLink>
          <NavLink to="search" className="navLink">
            Search
          </NavLink>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
