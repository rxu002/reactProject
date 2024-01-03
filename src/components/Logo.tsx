import { NavLink } from "react-router-dom";

export const Logo = () => {
  return (
    <NavLink to="/" className="logoContainer">
      <img src="/images/stack-of-books.png" alt="Shelf Logo" width="24px" />
      <span className="logoStyle"> Shelf </span>
    </NavLink>
  );
};
