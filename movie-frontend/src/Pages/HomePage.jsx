import React, { useState, useEffect } from "react";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import { getAllMovies, searchMovieByTitle } from "../Services/MovieService";
import SearchBar from "../Components/SearchBar";

const HomePage = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // Debounce search
  useEffect(() => {
    if (!search.trim()) {
      setIsSearching(false);
      setCurrentPage(0);
      return;
    }
    setIsSearching(true);
    setCurrentPage(0);

    const delay = setTimeout(() => {
      fetchSearchResults(search.trim(), 0);
    }, 500);

    return () => clearTimeout(delay);
  }, [search]);

  // Fetch all movies when not searching
  useEffect(() => {
    if (!isSearching) {
      fetchMovies(currentPage);
    }
  }, [currentPage, isSearching]);

  // Page change while searching
  useEffect(() => {
    if (isSearching && search.trim()) {
      fetchSearchResults(search.trim(), currentPage);
    }
  }, [currentPage]);

  const fetchMovies = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllMovies(page, 40);
      setMovies(res.data.content);
      setTotalPages(res.data.totalPages);
      setTotalElements(res.data.totalElements);
    } catch {
      setError("Failed to load movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchResults = async (title, page) => {
    setLoading(true);
    setError(null);
    try {
      const res = await searchMovieByTitle(title, page, 40);
      setMovies(res.data.content);
      setTotalPages(res.data.totalPages);
      setTotalElements(res.data.totalElements);
    } catch {
      setError("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => setSearch(e.target.value);

  const clearSearch = () => {
    setSearch("");
    setIsSearching(false);
    setCurrentPage(0);
  };

  const handlePageChange = (page) => {
    if (page < 0 || page >= totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const pages = [];
    let start = Math.max(0, currentPage - 2);
    let end = Math.min(totalPages - 1, start + 4);
    if (end - start < 4) start = Math.max(0, end - 4);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <div className="cin-root">

      {/* Header */}
      <header className="cin-header">
        <div className="cin-logo">CineVault</div>
        <div className="cin-tagline">Discover · Explore · Watch</div>

        {/* SearchBar Component */}
        <SearchBar
          search={search}
          onSearchChange={handleSearchChange}
          onClear={clearSearch}
          isSearching={isSearching}
          loading={loading}
        />
      </header>

      <div className="cin-divider" />

      {/* Stats bar */}
      {!loading && !error && (
        <div className="cin-stats-bar">
          <span>Page <strong>{currentPage + 1}</strong> of <strong>{totalPages}</strong></span>
          <span className="cin-dot-sep">·</span>
          <span>
            <strong>{totalElements}</strong> {isSearching ? "results found" : "total movies"}
          </span>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="cin-center">
          <div className="cin-spinner" />
          <p className="cin-loading-text">
            {isSearching ? `Searching for "${search}"...` : "Loading movies..."}
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="cin-center">
          <div className="cin-error">{error}</div>
          <button
            className="cin-retry-btn"
            onClick={() => isSearching ? fetchSearchResults(search, currentPage) : fetchMovies(currentPage)}
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && movies.length === 0 && (
        <div className="cin-center">
          <div className="cin-empty">
            <span>🎬</span>
            {isSearching ? `No movies found for "${search}"` : "No movies available."}
          </div>
        </div>
      )}

      {/* Grid */}
      {!loading && !error && movies.length > 0 && (
        <div className="cin-grid">
          {movies.map((movie, i) => (
            <div
              className="cin-card"
              key={movie.movieId || i}
              style={{ animationDelay: `${Math.min(i * 30, 300)}ms` }}
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
                  <div className="cin-no-poster">🎞️<small>No Poster</small></div>
                )}
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
                  {movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : "Unknown"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && !error && totalPages > 1 && (
        <div className="cin-pagination">
          <button
            className="cin-page-btn cin-page-arrow"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >‹</button>

          {getPageNumbers()[0] > 0 && (
            <>
              <button className="cin-page-btn" onClick={() => handlePageChange(0)}>1</button>
              {getPageNumbers()[0] > 1 && <span className="cin-ellipsis">…</span>}
            </>
          )}

          {getPageNumbers().map((p) => (
            <button
              key={p}
              className={`cin-page-btn ${p === currentPage ? "cin-page-active" : ""}`}
              onClick={() => handlePageChange(p)}
            >
              {p + 1}
            </button>
          ))}

          {getPageNumbers().at(-1) < totalPages - 1 && (
            <>
              {getPageNumbers().at(-1) < totalPages - 2 && <span className="cin-ellipsis">…</span>}
              <button className="cin-page-btn" onClick={() => handlePageChange(totalPages - 1)}>
                {totalPages}
              </button>
            </>
          )}

          <button
            className="cin-page-btn cin-page-arrow"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
          >›</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;