import {NavLink} from 'react-router-dom'
function NavBar() {
  return (
    <>
    <div className='nav-bar'>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/movies">Suggestions</NavLink>
        <NavLink to="/create-movie">Create a Movie</NavLink>
        <NavLink className="sign" to="/mood-lists">Mood Lists</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Sign up</NavLink>
      </nav>
    </div>
    </>
  );
}

export default NavBar;
