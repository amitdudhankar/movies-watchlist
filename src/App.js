import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import WatchList from "./Pages/WatchList";
import MovieDetails from "./Pages/MovieDetails";
import Navbar from "./Components/Navbar"; // Assuming you have a Navbar component for navigation
import Genres from "./Pages/Genres";
// import GenreMovies from "./Pages/GenreMovies";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Add a navigation bar to navigate between pages */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/genres" element={<Genres/>} />
          {/* <Route path="/genre/:genre" element={<GenreMovies/>} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
