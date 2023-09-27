import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";

function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div>
        <h1 className="welcome">Welcome {user.name},</h1>
      </div>
      <div>
        <h3 className="user-movies">📽️ Your Movies 🍿</h3>
      </div>
    </>
  );
}

export default Profile;
