//import { useState } from 'react'
import { Routes, Route } from "react-router-dom";

import "./App.css";

import IsPrivate from "./components/IsPrivate";
//import IsAnon from "./components/IsAnon";
import CreateMovie from "./pages/CreateMovie";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import MovieDetails from "./pages/MovieDetails";
import SearchResults from "./pages/SearchResults";
import MoodMovieLists from "./pages/MoodMovieLists";
import MoodMovieListDetails from "./pages/MoodMovieListDetails";
import Profile from "./pages/ProfilePage";
import Filter from "./pages/Filter";
import EditMovie from "./pages/EditMovie";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <div className="container">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/what-to-watch" element={<Filter />} />
          <Route
            path="/create-movie"
            element={
              <IsPrivate>
                {" "}
                <CreateMovie />{" "}
              </IsPrivate>
            }
          />
          <Route
            path="/edit-movie/:movieId"
            element={
              <IsPrivate>
                {" "}
                <EditMovie />{" "}
              </IsPrivate>
            }
          />
          <Route path="/movies/:movieId" element={<MovieDetails />} />

          <Route
            path="/profile"
            element={
              <IsPrivate>
                <Profile />
              </IsPrivate>
            }
          />

          <Route path="/search" element={<SearchResults />} />
          <Route
            path="/mood-lists"
            element={
              <IsPrivate>
                {" "}
                <MoodMovieLists />{" "}
              </IsPrivate>
            }
          />
          <Route
            path="/mood-lists/:moodListId"
            element={<MoodMovieListDetails />}
          ></Route>
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
