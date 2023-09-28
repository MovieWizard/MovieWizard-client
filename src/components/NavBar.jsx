import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { ModalV2 } from "./Modal-v2";
import LoginPage from "../forms/LoginPage";
import SignupPage from "../forms/SignupPage";
import homeImg from "../assets/HomeLogo.png";

function NavBar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  return (
    <>
      <nav className="nav-bar">
        <div className="nav-actions">
          <NavLink to="/">
            <img src={homeImg} alt="" />
          </NavLink>

          <div
            onClick={() => setIsNavMenuOpen((current) => !current)}
            className="hamburger"
          >
            <div className="piece" />
            <div className="piece" />
            <div className="piece" />
          </div>
        </div>

        <div className={`nav-menu ${isNavMenuOpen ? "open" : ""}`}>
          <div className="nav-group">
            <NavLink to="/what-to-watch">What to watch</NavLink>
            <NavLink to="/create-movie">Add a Movie</NavLink>
            <NavLink className="space" to="/mood-lists">
              Mood Lists
            </NavLink>
          </div>

          {isLoggedIn ? (
            <div className="nav-group">
              <NavLink to="/profile">Profile</NavLink>
              <a href="#" onClick={logOutUser}>
                Logout
              </a>
            </div>
          ) : (
            <div className="nav-group">
              <button
                className="btn-session"
                onClick={() => setIsLoginModalOpen(true)}
              >
                Login
              </button>
              <button
                className="btn-session"
                onClick={() => setIsSignupModalOpen(true)}
              >
                Sign Up
              </button>
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
                <SignupPage
                  onSuccess={() => {
                    setIsSignupModalOpen(false);
                    setIsLoginModalOpen(true);
                  }}
                />
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
            </div>
          )}
        </div>
      </nav>
      <div className="nav-bar-spacer" />
    </>
  );
}

export default NavBar;
