import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../components/Modal";

const apiUrl = "http://localhost:5005";

function MoodMovieLists() {
  const storedToken = localStorage.getItem("authToken");

  const [lists, setLists] = useState([]);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    axios
      .get(`${apiUrl}/api/mood-lists`, {
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
  }, []);

  const navigate = useNavigate();

  const handleClick = (list) => {
    navigate(`/mood-lists/${list._id}`);
  };



const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate(`/mood-lists`)  

  };

  const moodLists = () => {
    if (moodLists === null) {
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
  console.log("moodlists", moodLists());
  return (
    <>
      {moodLists()}


      <Modal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
      >

      <p className="modal-font-color">Create Mood list</p>
      <button type="submit" onClick={handleCloseModal}>Create</button>


      </Modal>
      <button onClick={handleOpenModal} >Add new Mood List</button>

    </>
  );
}

export default MoodMovieLists;
