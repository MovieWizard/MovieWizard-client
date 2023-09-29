import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditMovie() {
  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState("");
  const [year, setYear] = useState("");
  const [actors, setActors] = useState("");
  const [genre, setGenre] = useState("");
  const [plot, setPlot] = useState("");
  const [imdbRating, setImdbRating] = useState("");
  const [language, setLanguage] = useState("");

  const navigate = useNavigate();
  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/movies/${movieId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const movieData = response.data;

        setTitle(movieData.title);
        setPoster(movieData.poster);
        setYear(movieData.year);
        setActors(movieData.actors);
        setGenre(movieData.genre);
        setPlot(movieData.plot);
        setImdbRating(movieData.imdbRating);
        setLanguage(movieData.language);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovieData();
  }, [movieId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/movies/${movieId}`,
        {
          title: title,
          poster: poster,
          year: year,
          actors: actors,
          genre: genre,
          plot: plot,
          imdbRating: imdbRating,
          language: language,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("heree", response);
      navigate(`/movies/${movieId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="page-title">Edit Movie</h1>
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
          <div className="btn-filterpage-container">
            <button>Edit</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditMovie;
