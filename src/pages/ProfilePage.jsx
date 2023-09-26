import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import MoodMovieLists from "./MoodMovieLists";

function Profile() {
  const { user } = useContext(AuthContext);

  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    fetchPlaylistData();
  }, []);

  const fetchPlaylistData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/mood-lists`
      );
      const data = await response.json();
      setPlaylist(data);
    } catch (err) {
      console.error("Error fetching playlist data", err);
    }
  };

  return (
    <>
      <div>
        <h1>Welcome {user.name},</h1>
      </div>
      <div>
        <h3>Your Mood Lists:</h3>
        <MoodMovieLists use={user} />
      </div>
    </>
  );
}

export default Profile;
