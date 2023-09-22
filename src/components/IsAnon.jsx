//for the pages to users that are not logged in to see.

import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function IsAnon({children}) {
    const { isLoggedIn, isLoading } = useContext(AuthContext);

    if (!isLoggedIn) 
        return (
    <>
        <h1>Login</h1>

        <form onSubmit={handleLoginSubmit}>
          <label>Email:</label>
          <input type="email" name="email" value={email} onChange={handleEmail} />
  
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />
  
          <button type="submit">Login</button>
        </form>
    </>
    )

    if (isLoggedIn) {
        return <Navigate to="/"/>;
    } else {
        return children;
    }
}

export default IsAnon;