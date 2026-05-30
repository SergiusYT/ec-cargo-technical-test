import { useState } from 'react';

const SearchBar = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="form-container">
      <div className="newsletter-form-wrapper">
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="nebula-input">
              <input
                type="text"
                name="search"
                autoComplete="off"
                className="input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <label className="user-label">Buscar producto...</label>

              {/* Ícono de búsqueda */}
              <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M21 19l-4.35-4.35A7.5 7.5 0 1 0 15 16.65L19.35 21 21 19zM10.5 16a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"/>
              </svg>

              {/* Partículas nebula */}
              <div className="nebula-particle" style={{'--x': 0.2, '--y': -0.4}}></div>
              <div className="nebula-particle" style={{'--x': 0.5, '--y': -0.2}}></div>
              <div className="nebula-particle" style={{'--x': 0.3, '--y': 0.3}}></div>
              <div className="nebula-particle" style={{'--x': 0.7, '--y': 0.1}}></div>
              <div className="nebula-particle" style={{'--x': 0.1, '--y': -0.7}}></div>
              <div className="nebula-particle" style={{'--x': 0.6, '--y': 0.4}}></div>
            </div>

            <button className="subscribe-button" type="submit" disabled={loading}>
              Buscar
            </button>

            {query && (
              <button className="subscribe-button clear-btn" type="button" onClick={handleClear}>
                Limpiar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;