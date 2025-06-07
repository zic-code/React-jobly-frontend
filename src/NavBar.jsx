import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import "./NavBar.css"
function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext);

  return (
    <nav className="NavBar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/companies">Companies</NavLink>
      <NavLink to="/jobs">Jobs</NavLink>

      {currentUser ? (
        <>
          <span>Welcome, {currentUser.username}!</span>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/" onClick={logout}>Logout</NavLink>
        </>
      ) : (
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Signup</NavLink>
        </>
      )}
    </nav>
  );
}
export default NavBar;