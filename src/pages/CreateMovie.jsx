import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import YearDropdown from "../components/YearDropDown";

function CreateMovie() {
  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState("");
  const [year, setYear] = useState([]);
  const [actors, setActors] = useState("");
  const [genre, setGenre] = useState("");
  const [plot, setPlot] = useState("");
  const [imdbRating, setImdbRating] = useState("");
  const [language, setLanguage] = useState("");
  const [videoid, setVideoid] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken");
      console.log(token);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/movies`,
        {
          title: title,
          poster: poster,
          year: year,
          actors: actors,
          genre: genre,
          plot: plot,
          imdbRating: imdbRating,
          language: language,
          videoid: videoid,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("heree", response);
      navigate(`/movies/${response.data._id}`);
    } catch (error) {
      console.log("test", error);
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <h1 className="page-title">Add a Movie</h1>
      <div className="container-form">
        <form className="create-form" onSubmit={handleSubmit}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          <label>Image:</label>
          <input
            type="text"
            name="poster"
            placeholder="Insert Image"
            value={poster}
            onChange={(e) => setPoster(e.target.value)}
          />

          <label>Year:</label>
          {/* <YearDropdown onChange={(e) => setYear(e.target.value)} /> */}
          <input
            type="number"
            name="year"
            placeholder="Insert Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />

          <label>Cast:</label>
          <input
            type="text"
            name="actors"
            placeholder="Insert Cast"
            value={actors}
            onChange={(e) => setActors(e.target.value)}
          />

          <label>Genre:</label>
          <input
            type="text"
            name="genre"
            placeholder="Insert Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />

          <label>Plot:</label>
          <input
            type="text"
            name="plot"
            placeholder="Type Plot"
            value={plot}
            onChange={(e) => setPlot(e.target.value)}
          />

          <label>IMDB Rating:</label>
          <input
            type="number"
            name="imdbRating"
            placeholder="Insert Rating"
            value={imdbRating}
            onChange={(e) => setImdbRating(e.target.value)}
          />

          <label>Language:</label>
          <input
            type="text"
            name="language"
            placeholder="Insert Language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          />
          <label>Youtube Trailer ID:</label>
          <input
            type="text"
            name="videoid"
            placeholder="Insert youtube video id"
            value={videoid}
            onChange={(e) => setVideoid(e.target.value)}
          />
          <div className="btn-filterpage-container">
            <button className="btn-form">Add</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateMovie;
