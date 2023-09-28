import React, { useEffect, useState } from "react";
import Movie from "../components/Movie";
import { useParams } from "react-router-dom";
import axios from "axios";

function MoodListDetails() {
  const { moodListId } = useParams();
  const [moodListDetails, setMoodListDetails] = useState(null);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/mood-lists/${moodListId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMoodListDetails(response.data);
        console.log("yalla", response.data);
      })
      .catch((e) => {
        console.log("Error display mood list details", e);
      });
  }, []);

  const moodList = () => {
    if (moodListDetails === null) {
      return <p>Mood List is Loading...</p>;
    }
    return (
      <>
        {moodListDetails.movies.map((e) => {
          return <Movie {...e} />;
        })}
      </>
    );
  };

  return <>{moodList()}</>;
}

export default MoodListDetails;
