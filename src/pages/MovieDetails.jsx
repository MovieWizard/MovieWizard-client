import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Movie from "../components/Movie";
import { AuthContext } from "../context/auth.context";

function MovieDetails({ props }) {
  const { movieId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [movieDetails, setMovieDetails] = useState({});

  const isOwner = user && user._id === movieDetails.user;

  useEffect(() => {
    axios
      .get(`${import.meta.env.API_URL}/api/movies/${movieId}`)
      .then((response) => {
        console.log(response.data);
        setMovieDetails(response.data);
      })
      .catch((e) => {
        console.log("Error getting movie details from the API", e);
      });
  }, [movieId]);

  const handleEdit = () => {
    if (isOwner) {
      navigate(`/edit-movie/${movieId}`);
    } else {
      alert("You do not have permission to edit this movie.");
    }
  };

  const handleDelete = () => {
    if (isOwner) {
      const token = localStorage.getItem("authToken");
      axios
        .delete(`${import.meta.env.API_URL}/api/movies/${movieId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          navigate("/movies");
        })
        .catch((err) => console.log(err));
    } else {
      alert("You do not have permission to edit this movie.");
    }
  };

  return (
    <>
      <Movie {...movieDetails} />
      <h3>
        Year: {movieDetails.year} | Rating: {movieDetails.imdbRating} |
        Language: {movieDetails.language} | Genre: {movieDetails.genre}
      </h3>
      <h4>Cast: {movieDetails.actors}</h4>
      <p>Plot: {movieDetails.plot}</p>

      {isOwner && (
        <div>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </>
  );
}

export default MovieDetails;
