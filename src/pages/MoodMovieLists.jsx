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
      .post(`${apiUrl}/api/mood-lists`, newMood, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => setIsSubmitted(!isSubmited), handleCloseModal())

      .catch((e) => console.log("error", e));
  };

  const moodLists = () => {
    if (lists === null) {
      return <p>Mood Lists are Loading...</p>;
    }

    return lists.map((e) => {
      return (
        <section key={e._id} className="card" onClick={() => handleClick(e)}>
          <p>{e.title}</p>
        </section>
      );
    });
  };
  return (
    <>
      {moodLists()}

      <Modal showModal={showModal} handleCloseModal={handleCloseModal}>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              value={newMood.title || ""}
              name="title"
              type="text"
              placeholder="Enter mood list name"
              onChange={handleChange}
            />
            <hr />
          </label>
          <button type="submit">Create</button>
        </form>
      </Modal>
      <button onClick={handleOpenModal}>Add new Mood List</button>
    </>
  );
}

export default MoodMovieLists;
