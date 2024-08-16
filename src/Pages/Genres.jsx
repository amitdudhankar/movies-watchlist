import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/genre.css';

const genres = [
  'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 
  'Fantasy', 'Film-Noir', 'History', 'Horror', 'Musical', 'Mystery', 'Romance', 'Sci-Fi', 'Short', 'Sport', 
  'Superhero', 'Talk-Show', 'Thriller', 'War', 'Western'
];

const Genres = () => {
  return (
    <div className="genres-page">
      <h1 className="page-title">Genres</h1>
      <ul className="genres-list">
        {genres.map((g, index) => (
          <li key={index}>
            <Link>{g}</Link>
          </li>
        ))}
      </ul>
      <div className="card-container">
        <h1 className="no-results">Searching movies by Genres feature is not currently available.</h1>
      </div>
    </div>
  );
};

export default Genres;
