//import { useState } from 'react'
import { Routes, Route } from "react-router-dom";

import "./App.css";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import CreateMovie from "./pages/CreateMovie";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import MovieDetails from "./pages/MovieDetails";
import SearchResults from './pages/SearchResults';
import MoodMovieLists from "./pages/MoodMovieLists";


function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/create-movie"
          element={
            <IsPrivate>
              {" "}
              <CreateMovie />{" "}
            </IsPrivate>
          }
        />
        <Route path="/movies/:movieId" element={<MovieDetails />} />
         
          <Route path="/search" element={<SearchResults />} />
          <Route path="/mood-lists" element={<MoodMovieLists />} />

        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
