import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Movie from "../components/Movie";
import { AuthContext } from "../context/auth.context";
import Modal from "../components/Modal";
// import added from "../images/added.png";

function MovieDetails() {
  const navigate = useNavigate();

  const { movieId } = useParams();
  const { user } = useContext(AuthContext);
  const [movieDetails, setMovieDetails] = useState({});
  const [isFavourite, setIsFavorite] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedMoodList, setSelectedMoodList] = useState("");
  const [movieMoodList, setMovieMoodList] = useState("");
  const [lists, setLists] = useState([]);
  const storedToken = localStorage.getItem("authToken");

  const isOwner = user && user._id === movieDetails.user;

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/movies/${movieId}`)
      .then((response) => {
        console.log(response.data);
        setMovieDetails(response.data);
      })
      .catch((e) => {
        console.log("Error getting movie details from the API", e);
      });
  }, [movieId]);

  const handleEdit = () => {
    if (isOwner) {
      navigate(`/edit-movie/${movieId}`);
    } else {
      alert("You do not have permission to edit this movie.");
    }
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/mood-lists`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setLists(response.data))
      .catch((e) => {
        console.log("Error getting mood lists", e);
      });
  }, []);

  useEffect(() => {
    lists.forEach((list) => {
      if (list.movies.includes(movieId)) {
        setIsFavorite(true);
        setMovieMoodList(list._id);
        return;
      }
    });
  }, [lists]);

  const handleDelete = () => {
    if (isOwner) {
      axios
        .delete(`${import.meta.env.VITE_API_URL}/api/movies/${movieId}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then(() => {
          navigate("/");
        })
        .catch((err) => console.log(err));
    } else {
      alert("You do not have permission to edit this movie.");
    }
  };

  const handleToggleFavourite = () => {
    isFavourite ? removeFromList() : setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addToList();
  };

  const addToList = () => {
    axios
      .put(
        `${
          import.meta.env.VITE_API_URL
        }/api/mood-lists/${selectedMoodList}/add`,
        {
          movieId: movieId,
        },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        handleCloseModal(response);
        setIsFavorite(true);
        setMovieMoodList(selectedMoodList);
      })
      .catch((e) => {
        console.log("Error updating mood list", e);
      });
  };

  const removeFromList = () => {
    axios
      .put(
        `${
          import.meta.env.VITE_API_URL
        }/api/mood-lists/${movieMoodList}/remove`,
        {
          movieId: movieId,
        },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        handleCloseModal(response);
        setIsFavorite(false);
      })
      .catch((e) => {
        console.log("Error updating mood list", e);
      });
  };

  return (
    <>
      {isOwner && (
        <div>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}

      <div className="movie-details-container">
        <button className="favorite-icon" onClick={handleToggleFavourite}>
          {" "}
          {/* <img src={added} /> */}
          {isFavourite ? "Remove from Moodlist" : "Add to Moodlist"}
        </button>
      </div>

      <Movie {...movieDetails} />
      <h3>
        Year: {movieDetails.year} | Rating: {movieDetails.imdbRating} |
        Language: {movieDetails.language} | Genre: {movieDetails.genre}
      </h3>
      <h4>Cast: {movieDetails.actors}</h4>
      <p>Plot: {movieDetails.plot}</p>

      <Modal showModal={showModal} handleCloseModal={handleCloseModal}>
        <div>
          <h2>Choose a Mood List to add this movie:</h2>

          <form onSubmit={handleSubmit}>
            <div>
              {lists.map((list) => (
                <label key={list._id}>
                  <input
                    onChange={(e) => setSelectedMoodList(e.target.value)}
                    type="radio"
                    value={list._id}
                    name="list"
                  />{" "}
                  {list.title}
                </label>
              ))}
            </div>
            <button type="submit">Add</button>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default MovieDetails;
