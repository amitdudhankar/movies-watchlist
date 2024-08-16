import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../CSS/home.css';

const API_KEY = '7c6a243b'; // Your OMDB API key
const PER_PAGE = 10; // Number of items per page
const PAGINATION_LIMIT = 5; // Number of pages to display at once

const Home = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}&page=${currentPage}`);
        const data = response.data;

        if (data.Search) {
          setMovies(data.Search);
          const totalResults = parseInt(data.totalResults);
          setTotalPages(Math.ceil(totalResults / PER_PAGE));
        } else {
          setMovies([]);
          setTotalPages(0);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
        setMovies([]);
        setTotalPages(0);
      }
    };

    fetchMovies();
  }, [query, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pageButtons = [];
    const totalPagesToRender = Math.min(totalPages, PAGINATION_LIMIT);
    const startPage = Math.max(1, currentPage - Math.floor(PAGINATION_LIMIT / 2));

    // First page button
    pageButtons.push(
      <button key="first" onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
        First
      </button>
    );

    // Previous button
    if (currentPage > 1) {
      pageButtons.push(
        <button key="prev" onClick={() => handlePageChange(currentPage - 1)}>
          &laquo;
        </button>
      );
    }

    // Numbered pages
    for (let i = startPage; i < startPage + totalPagesToRender && i <= totalPages; i++) {
      pageButtons.push(
        <button
          key={i}
          className={currentPage === i ? 'active' : ''}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    // Next button
    if (currentPage < totalPages) {
      pageButtons.push(
        <button key="next" onClick={() => handlePageChange(currentPage + 1)}>
          &raquo;
        </button>
      );
    }

    // Last page button
    pageButtons.push(
      <button key="last" onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
        Last
      </button>
    );

    return pageButtons;
  };

  return (
    <div className="page">
      <h1 className="page-title">Explore Movies</h1>
      <form onSubmit={(e) => { e.preventDefault(); }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a Movie or Series"
        />
        <button type="submit">Search</button>
      </form>
      <div className="card-container">
        {movies.length > 0 ? (
          movies.map(movie => (
            <div key={movie.imdbID} className="card">
              <Link to={`/movie/${movie.imdbID}`} className="card-link">
                <img src={movie.Poster} alt={movie.Title} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{movie.Title}</h5>
                  <p className="card-text">{movie.Year}</p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>No movies found.</p>
        )}
      </div>
      {totalPages > 0 && (
        <div className="pagination">
          {renderPagination()}
        </div>
      )}
    </div>
  );
};

export default Home;



