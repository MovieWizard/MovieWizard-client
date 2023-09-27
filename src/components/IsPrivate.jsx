import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { ModalV2 } from "./Modal-v2";
import LoginPage from "../forms/LoginPage";

function IsPrivate({ children }) {
  const { isLoggedIn } = useContext(AuthContext);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  if (!isLoggedIn) {
    return (
      <>
        <button onClick={openLoginModal}>Please Login</button>
        {isLoginModalOpen && (
          <ModalV2 isOpen={isLoginModalOpen} onClose={closeLoginModal}>
            <LoginPage />
          </ModalV2>
        )}
      </>
    );
  } else {
    return children;
  }
}

export default IsPrivate;
