import React from "react";

function Movie(props) {
  return (
    <>
      <h3>{props.title}Hello</h3>
      <img src={props.poster} alt="movie-image" />
    </>
  );
  
}

export default Movie;
