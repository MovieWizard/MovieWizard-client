import React from "react";
import { useNavigate } from "react-router-dom";

function Movie(props) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/movies/${props._id}`)}
      className={`movie-card ${props.disableHover ? "hover-disabled" : ""}`}
    >
      <h3 className="movie-name">{props.title}</h3>
      <img className="movie-image" src={props.poster} alt="movie-image" />
    </div>
  );
}

export default Movie;
