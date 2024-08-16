


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css';
import '../CSS/moviedetails.css';

const API_KEY = '7c6a243b'; // Your OMDB API key

const MovieDetails = () => {
  const { id } = useParams(); // Get IMDb ID from URL params
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovie();
  }, [id]);

  const addToWatchlist = () => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    if (!watchlist.find(m => m.imdbID === movie.imdbID)) {
      watchlist.push(movie);
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
      toast.success(`${movie.Title} added to Watchlist!`); // Display success toast
    } else {
      toast.warning(`${movie.Title} is already in your Watchlist.`);
    }
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className='details-movie'>
    <div className="container">
      <div className="poster">
        <img src={movie.Poster} alt={movie.Title} />
      </div>
      <h1>{movie.Title}</h1>
      <table className="movie-details">
        <tbody>
          <tr>
            <td>Type:</td>
            <td>{movie.Type}</td>
          </tr>
          <tr>
            <td>Released Year:</td>
            <td>{movie.Year}</td>
          </tr>
          <tr>
            <td>Rated:</td>
            <td>{movie.Rated}</td>
          </tr>
          <tr>
            <td>Runtime:</td>
            <td>{movie.Runtime}</td>
          </tr>
          <tr>
            <td>Genre:</td>
            <td>{movie.Genre}</td>
          </tr>
          <tr>
            <td>Director:</td>
            <td>{movie.Director}</td>
          </tr>
          <tr>
            <td>Writer:</td>
            <td>{movie.Writer}</td>
          </tr>
          <tr>
            <td>Actors:</td>
            <td>{movie.Actors}</td>
          </tr>
          <tr>
            <td>Language:</td>
            <td>{movie.Language}</td>
          </tr>
          <tr>
            <td>Country:</td>
            <td>{movie.Country}</td>
          </tr>
          <tr>
            <td>Awards:</td>
            <td>{movie.Awards}</td>
          </tr>
          <tr>
            <td>IMDb Rating:</td>
            <td>{movie.imdbRating}</td>
          </tr>
          <tr>
            <td>Metascore:</td>
            <td>{movie.Metascore}</td>
          </tr>
          <tr>
            <td>Box Office:</td>
            <td>{movie.BoxOffice}</td>
          </tr>
          <tr>
            <td>Website:</td>
            <td>{movie.Website}</td>
          </tr>
        </tbody>
      </table>
      <div className="plot">
        <h2>Plot</h2>
        <p>{movie.Plot}</p>
      </div>
      <button onClick={addToWatchlist} className="add-to-watchlist">Add to Watchlist</button>
    </div>
    </div>
  );
};

export default MovieDetails;
