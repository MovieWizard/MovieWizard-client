import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import Movie from "../components/Movie";
import axios from "axios";
import { Link } from "react-router-dom";

function Profile() {
  const { user } = useContext(AuthContext);
  const [userMovies, setUserMovies] = useState([]);
  console.log(userMovies);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/my-movies`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserMovies(res.data);
      })
      .catch((e) => console.log("error while fetching user movies", e));
  }, [user._id]);

  return (
    <>
      <div>
        <h1 className="welcome">Welcome {user.name},</h1>
      </div>
      <div>
        {userMovies.length > 0 && (
          <>
            <h3 className="user-movies-title">📽️ Your Movies 🍿</h3>
            <div className="user-movies-container">
              <div className="user-movies-list">
                {userMovies.map((movie) => {
                  return (
                    <Link
                      to={`/movies/${movie._id}`}
                      className="user-movies-list-item"
                    >
                      <Movie {...movie} />
                    </Link>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Profile;
