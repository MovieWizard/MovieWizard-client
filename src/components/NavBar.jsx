import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
function NavBar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  return (
    <div className="nav-bar">
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/movies">Suggestions</NavLink>
        <NavLink to="/create-movie">Create a Movie</NavLink>
        <NavLink className="space" to="/mood-lists">Mood Lists</NavLink>
        {isLoggedIn ? (
          <a href="#" onClick={logOutUser}>
            Logout
          </a>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Sign up</NavLink>
          </>
        )}
      </nav>
    </div>
  );
}

export default NavBar;
