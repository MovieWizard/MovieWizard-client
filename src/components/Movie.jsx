import React from "react";

function Movie(props) {
  return (
    <div className="movie-card">
      <h3 className="movie-name">{props.title}</h3>
      <img className="movie-image" src={props.poster} alt="movie-image" />
    </div>
  );
  
}

export default Movie;
