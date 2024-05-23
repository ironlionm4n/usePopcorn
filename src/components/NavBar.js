import { Logo } from "./Logo";

export const NavBar = ({ children }) => {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
};
