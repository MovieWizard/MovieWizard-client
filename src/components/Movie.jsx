import React from "react";
import { useNavigate } from "react-router-dom";
import ImageWithFallback from "../components/NoImage";

function Movie(props) {
  const navigate = useNavigate();

  const handleMovieClick = () => {
    navigate(`/movies/${props._id}`);
  };

  return (
    <div
      onClick={handleMovieClick}
      className={`movie-card ${props.disableHover ? "hover-disabled" : ""}`}
    >
      <h3 className="movie-name">{props.title}</h3>
      <ImageWithFallback src={props.poster} alt="movie-image" />
    </div>
  );
}

export default Movie;
