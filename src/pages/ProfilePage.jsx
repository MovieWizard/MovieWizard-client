import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>Welcome {user.name},</h1>
    </div>
  );
}

export default Profile;
