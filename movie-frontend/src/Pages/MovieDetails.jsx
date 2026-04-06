import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./MovieDetails.css";
import { getMoviesById, getRecommendedMovie } from "../Services/MovieService";

const parseList = (str) => {
  if (!str) return [];
  try {
    const parsed = JSON.parse(str);
    if (Array.isArray(parsed)) {
      return parsed.map((item) => (typeof item === "object" ? item.name : item));
    }
  } catch {
    return str
      .replace(/^\[|\]$/g, "")
      .split(",")
      .map((s) => s.trim().replace(/^['"]|['"]$/g, ""))
      .filter(Boolean);
  }
  return [];
};
 
const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [recommendations, setRecommendations] = useState([]);
  const [recLoading, setRecLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMovie(null);
    setRecommendations([]);
    setLoading(true);

    const fetchMovie = async () => {
      try {
        const res = await getMoviesById(id);
        console.log(res.data);
        setMovie(res.data);
        // fetch recommendations using the movie title
        fetchRecommendations(res.data.title);
      } catch {
        setError("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  const fetchRecommendations = async (title) => {
    setRecLoading(true);
    try {
      const res = await getRecommendedMovie(title);
      console.log(res.data);
      setRecommendations(res.data);
    } catch {
      setRecommendations([]);
    } finally {
      setRecLoading(false);
    }
  };

  if (loading) return (
    <div className="md-center">
      <div className="md-spinner" />
      <p className="md-loading-text">Loading movie...</p>
    </div>
  );

  if (error) return (
    <div className="md-center">
      <div className="md-error">{error}</div>
    </div>
  );

  if (!movie) return null;

  const genres = parseList(movie.genres);
  const keywords = parseList(movie.keywords);
  const cast = parseList(movie.updatedCast);
  const crew = parseList(movie.updatedCrew);
  const year = movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : "N/A";
  const langMap = { hi: "Hindi", en: "English", fr: "French", es: "Spanish", de: "German", ja: "Japanese", ko: "Korean" };
  const language = langMap[movie.originalLanguage] || movie.originalLanguage?.toUpperCase();

  return (
    <div className="md-root">

      {/* ── BACKDROP ── */}
      <div className="md-backdrop-wrap">
        {movie.backdropUrl && (
          <img className="md-backdrop" src={movie.backdropUrl} alt="" />
        )}
        <div className="md-backdrop-overlay" />

        {/* ── HERO ── */}
        <div className="md-hero">
          <div className="md-poster-wrap">
            {movie.posterUrl
              ? <img className="md-poster" src={movie.posterUrl} alt={movie.title} />
              : <div className="md-no-poster">🎞️</div>
            }
          </div>

          <div className="md-hero-info">
            <h1 className="md-title">{movie.title}</h1>
            <div className="md-meta-row">
              <span className="md-year">{year}</span>
              {movie.adult === "False" && <span className="md-badge md-badge-u">U/A</span>}
              <span className="md-lang">{language}</span>
              <span className="md-vote">⭐ {parseFloat(movie.voteAverage).toFixed(1)}</span>
            </div>
            <div className="md-genres">
              {genres.map((g) => (
                <span className="md-genre-tag" key={g}>{g}</span>
              ))}
            </div>
            <p className="md-overview">{movie.overview}</p>
          </div>
        </div>
      </div>

      {/* ── DETAILS BODY ── */}
      <div className="md-body">

        {/* Cast */}
        {cast.length > 0 && (
          <section className="md-section">
            <h2 className="md-section-title"><span className="md-section-bar" />Cast</h2>
            <div className="md-pills">
              {cast.map((name) => (
                <div className="md-cast-pill" key={name}>
                  <div className="md-cast-avatar">{name.charAt(0)}</div>
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Crew */}
        {crew.length > 0 && (
          <section className="md-section">
            <h2 className="md-section-title"><span className="md-section-bar" />Crew</h2>
            <div className="md-pills">
              {crew.map((name, i) => (
                <div className="md-crew-pill" key={i}>
                  <span className="md-crew-icon">🎬</span>
                  {name}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Info Grid */}
        <section className="md-section">
          <h2 className="md-section-title"><span className="md-section-bar" />Details</h2>
          <div className="md-info-grid">
            <div className="md-info-card">
              <span className="md-info-label">Release Date</span>
              <span className="md-info-value">{movie.releaseDate || "N/A"}</span>
            </div>
            <div className="md-info-card">
              <span className="md-info-label">Language</span>
              <span className="md-info-value">{language}</span>
            </div>
            <div className="md-info-card">
              <span className="md-info-label">Rating</span>
              <span className="md-info-value">⭐ {parseFloat(movie.voteAverage).toFixed(1)} / 10</span>
            </div>
            <div className="md-info-card">
              <span className="md-info-label">Adult</span>
              <span className="md-info-value">{movie.adult === "True" ? "Yes" : "No"}</span>
            </div>
          </div>
        </section>

        {/* Keywords */}
        {keywords.length > 0 && (
          <section className="md-section">
            <h2 className="md-section-title"><span className="md-section-bar" />Keywords</h2>
            <div className="md-keywords">
              {keywords.map((kw) => (
                <span className="md-keyword" key={kw}>#{kw}</span>
              ))}
            </div>
          </section>
        )}

        {/* ── RECOMMENDATIONS ── */}
        <section className="md-section">
          <h2 className="md-section-title">
            <span className="md-section-bar" />
            Recommended Movies
          </h2>

          {/* Loading */}
          {recLoading && (
            <div className="md-rec-loading">
              <div className="md-spinner" />
              <p className="md-loading-text">Finding recommendations...</p>
            </div>
          )}

          {/* Empty */}
          {!recLoading && recommendations.length === 0 && (
            <p className="md-rec-empty">No recommendations found.</p>
          )}

          {/* Rec Grid */}
          {!recLoading && recommendations.length > 0 && (
            <div className="md-rec-grid">
              {recommendations.map((rec, i) => (
                <div
                  className="md-rec-card"
                  key={rec.movieId || i}
                  onClick={() => navigate(`/movie/${rec.movie_id}`)}
                  style={{ animationDelay: `${Math.min(i * 40, 400)}ms` }}
                >
                  <div className="md-rec-poster-wrap">
                    {rec.poster_path ? (
                      <img
                        className="md-rec-poster"
                        src={`https://image.tmdb.org/t/p/w500${rec.poster_path}`}
                        alt={rec.title}
                        loading="lazy"
                      />
                    ) : (
                      <div className="md-rec-no-poster">🎞️</div>
                    )}
                    <div className="md-rec-overlay">
                      <div className="md-rec-play-btn">
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                          <path d="M3 2l9 5-9 5V2z" fill="#e63946" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="md-rec-body">
                    <p className="md-rec-title">{rec.title || "Untitled"}</p>
                    <div className="md-rec-date">
                      <span className="md-rec-dot" />
                      {rec.release_date ? new Date(rec.release_date).getFullYear() : "Unknown"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
};

export default MovieDetails;