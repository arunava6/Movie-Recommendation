import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./HomePage.css";
import { getAllMovies } from '../Services/MovieService';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await getAllMovies();
        console.log(res.data);
        setMovies(res.data);
      } catch (err) {
        setError("Failed to load movies. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const filtered = movies.filter((m) =>
    m.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="cin-root">
      {/* Header */}
      <header className="cin-header">
        <div className="cin-logo">CineVault</div>
        <div className="cin-tagline">Discover · Explore · Watch</div>

        {/* Search */}
        <div className="cin-search-wrap">
          <span className="cin-search-icon">🔍</span>
          <input
            className="cin-search"
            type="text"
            placeholder="Search movies by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      <div className="cin-divider" />

      {/* Result count */}
      {!loading && !error && (
        <p className="cin-result-count">
          Showing <span>{filtered.length}</span> of <span>{movies.length}</span> movies
          {search && <> for "<span>{search}</span>"</>}
        </p>
      )}

      {/* Loading */}
      {loading && (
        <div className="cin-center">
          <div className="cin-spinner" />
          <p className="cin-loading-text">Loading movies...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="cin-center">
          <div className="cin-error">{error}</div>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && filtered.length === 0 && (
        <div className="cin-center">
          <div className="cin-empty">
            <span>🎬</span>
            {search ? `No movies found for "${search}"` : "No movies available."}
          </div>
        </div>
      )}

      {/* Movie Grid */}
      {!loading && !error && filtered.length > 0 && (
        <div className="cin-grid">
          {filtered.map((movie, i) => (
            <div
              className="cin-card"
              key={i}
              style={{ animationDelay: `${Math.min(i * 40, 400)}ms` }}
              onClick={() => navigate(`/movie/${movie.movieId}`)}
            >
              <div className="cin-poster-wrap">
                {movie.posterUrl ? (
                  <img
                    className="cin-poster"
                    src={movie.posterUrl}
                    alt={movie.title}
                    loading="lazy"
                  />
                ) : (
                  <div className="cin-no-poster">
                    🎞️
                    <small>No Poster</small>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="cin-overlay">
                  <div className="cin-play-btn">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 2l9 5-9 5V2z" fill="#e63946" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="cin-card-body">
                <p className="cin-title">{movie.title || "Untitled"}</p>
                <div className="cin-date">
                  <span className="cin-date-dot" />
                  {movie.releaseDate
                    ? new Date(movie.releaseDate).getFullYear()
                    : "Unknown"}
                </div>
                <button
                  className="cin-view-btn"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent card click conflict
                    navigate(`/movie/${movie.movieId}`);
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export default HomePage