import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { ModalV2 } from "./Modal-v2";
import LoginPage from "../forms/LoginPage";
import SignupPage from "../forms/SignupPage";

function NavBar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  return (
    <div className="nav-bar">
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/what-to-watch">What to watch</NavLink>
        <NavLink to="/create-movie">Create a Movie</NavLink>
        <NavLink className="space" to="/mood-lists">
          Mood Lists
        </NavLink>
        {isLoggedIn ? (
          <>
            <NavLink to="/profile">Profile</NavLink>
            <a href="#" onClick={logOutUser}>
              Logout
            </a>
          </>
        ) : (
          <>
            <button onClick={() => setIsLoginModalOpen(true)}>Login</button>
            <button onClick={() => setIsSignupModalOpen(true)}>Sign Up</button>
            <ModalV2
              isOpen={isLoginModalOpen}
              onClose={() => setIsLoginModalOpen(false)}
            >
              <LoginPage onSuccess={() => setIsLoginModalOpen(false)} />
              <h4>Don't have an account?</h4>
              <button
                onClick={() => {
                  setIsSignupModalOpen(true);
                  setIsLoginModalOpen(false);
                }}
              >
                Sign Up!
              </button>
            </ModalV2>
            <ModalV2
              isOpen={isSignupModalOpen}
              onClose={() => setIsSignupModalOpen(false)}
            >
              <SignupPage />
              <h4>Already have an account?</h4>
              <button
                onClick={() => {
                  setIsSignupModalOpen(false);
                  setIsLoginModalOpen(true);
                }}
              >
                Log in!
              </button>
            </ModalV2>
          </>
        )}
      </nav>
    </div>
  );
}

export default NavBar;
