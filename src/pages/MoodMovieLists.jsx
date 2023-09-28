import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../components/Modal";

function MoodMovieLists() {
  const storedToken = localStorage.getItem("authToken");

  const [lists, setLists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newMood, setNewMood] = useState({});
  const [isSubmited, setIsSubmitted] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/mood-lists`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setLists(response.data);
      })
      .catch((e) => {
        response.status(500).json({
          message: "Error get all lists",
          error: e,
        });
      });
  }, [isSubmited]);

  const navigate = useNavigate();

  const handleClick = (list) => {
    navigate(`/mood-lists/${list._id}`);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewMood({ title: "" });
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setNewMood((newMood) => ({
      ...newMood,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/mood-lists`, newMood, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => setIsSubmitted(!isSubmited), handleCloseModal())

      .catch((e) => console.log("error", e));
  };

  const moodLists = () => {
    if (lists === null) {
      return <p>Mood Lists are Loading...</p>;
    }

    if (lists.length === 0) {
      return <p>No mood lists found for this user.</p>;
    }

    return lists.map((e) => {
      return (
        <div className="playlist-box">
        <section
          key={e._id}
          className="playlist"
          onClick={() => handleClick(e)}
        >
          <h3 className="playlist-name">{e.title}</h3>
        </section>
        </div>
      );
    });
  };
  return (
    <>
      <h1 className="page-title">Mood Lists:</h1>
      <div className="btn-filterpage-container">
        <button className="btn-form" onClick={handleOpenModal}>
          Add new Mood List
        </button>
      </div>
      {moodLists()}

      <Modal showModal={showModal} handleCloseModal={handleCloseModal}>
        <h2 className="modal-name">Create Mood List</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              className="create-moodlist-form"
              value={newMood.title || ""}
              name="title"
              type="text"
              placeholder="What's the mood? ex. Watch when feeling Happy"
              onChange={handleChange}
            />
          </label>
          <div className="btn-filterpage-container">
            <button className="btn-form" type="submit">
              Create
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default MoodMovieLists;
