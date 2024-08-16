import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import toast CSS
import "../CSS/watchlist.css"; // Update the path as needed

const API_KEY = "7c6a243b"; // Your OMDB API key

const WatchList = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [filterType, setFilterType] = useState("all"); // 'all', 'series', 'movie'

  useEffect(() => {
    // Fetch the watchlist movies from local storage
    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(storedWatchlist);
  }, []);

  const removeFromWatchlist = (imdbID) => {
    const updatedWatchlist = watchlist.filter(
      (movie) => movie.imdbID !== imdbID
    );
    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
    toast.success("Movie removed from Watchlist."); // Display success toast
  };

  // Filter movies based on type
  const filteredWatchlist = watchlist.filter((movie) => {
    if (filterType === "all") return true;
    return movie.Type.toLowerCase() === filterType;
  });

  return (
    <div className="watchlist-page">
      <h1 className="watchlist-title" style={{ color: "white" }}>
        My Watchlist
      </h1>

      <button className="btn1" onClick={() => setFilterType("all")}>
        All
      </button>
      <button className="btn2" onClick={() => setFilterType("series")}>
        Series
      </button>
      <button className="btn3" onClick={() => setFilterType("movie")}>
        Movies
      </button>

      <div className="movies-list">
        {filteredWatchlist.length > 0 ? (
          <div className="card-container">
            {filteredWatchlist.map((movie) => (
              <div key={movie.imdbID} className="watchlist-card">
                <Link to={`/movie/${movie.imdbID}`} className="card-link">
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{movie.Title}</h5>
                    <p className="card-text">{movie.Year}</p>
                  </div>
                </Link>
                <button
                  onClick={() => removeFromWatchlist(movie.imdbID)}
                  className="remove-button"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-results">
            No {filterType === "series" ? "series" : "movies"} in watchlist.
          </p>
        )}
      </div>
    </div>
  );
};

export default WatchList;
