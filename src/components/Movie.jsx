import React from "react";

function Movie(props) {
  const { Title, Poster } = props;

  return (
    <>
      <h3>{Title}</h3>
      <img src={Poster} alt="movie-image" />
    </>
  );
}

export default Movie; 
