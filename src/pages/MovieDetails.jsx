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
      <div className="movie-details-title-image">
        <Movie {...movieDetails} disableHover={true} />
      </div>

      <div className="btn-filterpage-container">
        <button className="favorite-icon" onClick={handleToggleFavourite}>
          {isFavourite ? "Remove from Moodlist" : "Add to Moodlist"}
        </button>
      </div>
      <div className="movie-details-and-trailer">
        <div className="movie-details-box">
          <h3 className="movie-details-text">
            Year: {movieDetails.year} | Rating: {movieDetails.imdbRating} |
            Language: {movieDetails.language}
          </h3>
          <h3 className="movie-details-text"> Genre: {movieDetails.genre}</h3>
          <h4 className="movie-details-text">Cast: {movieDetails.actors}</h4>
          <p className="movie-details-text">Plot: {movieDetails.plot}</p>

          {isOwner && (
            <div className="btn-edit-delete-container">
              <button className="btn-form" onClick={handleEdit}>
                Edit
              </button>
              <button className="btn-form" onClick={handleDelete}>
                Delete
              </button>
            </div>
          )}
        </div>

        {movieDetails.videoid && (
          <div className="trailer">
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${movieDetails.videoid}`}
              title="YouTube Video Player"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
      <Modal showModal={showModal} handleCloseModal={handleCloseModal}>
        <h2 className="modal-name">Choose a Mood List to add this movie:</h2>

        <form onSubmit={handleSubmit}>
          <div className="list-options">
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
          <div className="btn-filterpage-container">
            <button className="btn-form" type="submit">
              Add
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default MovieDetails;
