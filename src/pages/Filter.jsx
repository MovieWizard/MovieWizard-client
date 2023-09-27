import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import YearDropdown from "../components/YearDropDown";
import Movie from "../components/Movie";

function Filter() {
  const navigate = useNavigate();
  const [filterResults, setFilterResults] = useState([]);
  const [rating, setRating] = useState();
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState();

  const handleMovieClick = (movie) => {
    navigate(`/movies/${movie._id}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/filters`, {
        params: {
          rating: rating,
          genre: genre,
          year: year,
          lastMovieId:
            filterResults.length === 0
              ? null
              : filterResults[filterResults.length - 1]._id,
        },
      })
      .then((res) => {
        setFilterResults(res.data);
        console.log(res);
      });
    window
      .scrollTo({
        top: 0,
        behavior: "smooth",
      })
      .catch((e) => console.log("error to get filter results", e));
  };

  const showRecommendMore = () => {
    if (filterResults.length > 0) {
      return (
        <div className="btn-filterpage-container">
          <button className="btn-form btn-recommend" onClick={handleSubmit}>
            Recommend more
          </button>
        </div>
      );
    }
  };

  return (
    <>
      <div className="container-form">
        <form className="filter-form" onSubmit={handleSubmit}>
          <label> Rating </label>
          <select
            onChange={(e) => {
              console.log("hereee", e);
              setRating(e.target.value);
            }}
          >
            <option value="0">See All</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
            <option value="6">6+</option>
            <option value="7">7+</option>
            <option value="8">8+</option>
            <option value="9">9+</option>
            <option value="10">10</option>
          </select>

          <label>Genre</label>

          <select
            onChange={(e) => {
              setGenre(e.target.value);
            }}
          >
            <option value="action">Action</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="drama">Drama</option>
            <option value="fantasy">Fantasy</option>
            <option value="horror">Horror</option>
            <option value="mystery">Mystery</option>
            <option value="romance">Romance</option>
            <option value="science_fiction">Science Fiction</option>
            <option value="thriller">Thriller</option>
            <option value="animation">Animation</option>
            <option value="family">Family</option>
            <option value="crime">Crime</option>
            <option value="documentary">Documentary</option>
            <option value="history">History</option>
            <option value="musical">Musical</option>
            <option value="war">War</option>
            <option value="western">Western</option>
          </select>

          <label>Year</label>
          <YearDropdown
            onChange={(e) => {
              setYear(e.target.value);
            }}
          />
          <div className="btn-filterpage-container">
            <button className="btn-form" type="submit">
              Filter
            </button>
          </div>
        </form>
      </div>
      <div className="filter-container">
        {filterResults.map((e) => (
          <section key={e._id} onClick={() => handleMovieClick(e)}>
            <Movie {...e} />
          </section>
        ))}
      </div>
      {showRecommendMore()}
    </>
  );
}

export default Filter;
