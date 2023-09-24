import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MovieDetails() {
  const { movieId } = useParams();

  const [movieDetails, setMovieDetails] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5005/api/movies/${movieId}`)
      .then((response) => {
        console.log(response.data);
        setMovieDetails(response.data);
      })
      .catch((e) => {
        console.log("Error getting movie details from the API", e);
      });
  }, [movieId]);

  return (
    <>
      <h1>{movieDetails.Title}</h1>
      <img src={movieDetails.Poster} alt="movie-image" />
      <h3>
        Year: {movieDetails.Year} | Rating: {movieDetails.imdbRating} |
        Language: {movieDetails.Language} | Genre: {movieDetails.Genre}
      </h3>
      <h4>Cast: {movieDetails.Actors}</h4>
      <p>Plot: {movieDetails.Plot}</p>
    </>
  );
}

export default MovieDetails;
