import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import Movie from "../components/Movie";

function SearchResults() {
  const [search, setSearch] = useState([]);
  const [searchParams] = useSearchParams(window.location.search);

  const searchParamResult = searchParams.get("query");

  useEffect(() => {
    // Clear search results if it's just white spaces
    if (searchParamResult.trim() === "") {
      setSearch([]);
      return;
    }
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/search?q=${searchParamResult}`)
      .then((res) => {
        setSearch(res.data);
      })
      .catch((e) => console.log("error to get search results", e));
  }, []);
  const navigate = useNavigate();

  const handleClick = (movie) => {
    navigate(`/movies/${movie._id}`);
  };

  const handleCreateClick = () => {
    navigate(`/create-movie`);
  };

  const SearchResults = () => {
    if (SearchResults === null) {
      return <p>Loading Results...</p>;
    }
  };

  return (
    <>
      <div className="movie-list">
        {search.length === 0 ? (
          <div className="no-results">
            <p>No results found.</p>
            <div className="no-result-btns">
              <button
                onClick={() => {
                  navigate("/");
                }}
              >
                Search again
              </button>
              <button onClick={() => handleCreateClick()}>Add new Movie</button>
            </div>
          </div>
        ) : (
          search.map((e) => (
            <div key={e._id} onClick={() => handleClick(e)}>
              <Movie {...e} />
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default SearchResults;
