import React from "react";
import "./SearchBar.css";

const SearchBar = ({ search, onSearchChange, onClear, isSearching, loading }) => {
  return (
    <div className="sb-wrap">
      <div className="sb-input-wrap">
        <span className="sb-icon">🔍</span>
        <input
          className="sb-input"
          type="text"
          placeholder="Search all movies globally..."
          value={search}
          onChange={onSearchChange}
        />
        {search && (
          <button className="sb-clear" onClick={onClear}>✕</button>
        )}
      </div>
      {isSearching && !loading && (
        <p className="sb-label">
          Global results for "<strong>{search}</strong>"
        </p>
      )}
    </div>
  );
};

export default SearchBar;