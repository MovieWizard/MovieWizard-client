import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Movie from "../components/Movie";

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
      <Movie {...movieDetails}/>
      <h3>
        Year: {movieDetails.year} | Rating: {movieDetails.imdbRating} |
        Language: {movieDetails.language} | Genre: {movieDetails.genre}
      </h3>
      <h4>Cast: {movieDetails.actors}</h4>
      <p>Plot: {movieDetails.plot}</p>
    </>
  );
}

export default MovieDetails;
