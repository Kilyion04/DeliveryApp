import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import '../style/autocomplete.css';

const AddressAutocomplete = ({ value, onChange, className }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');
  const [activeSuggestion, setActiveSuggestion] = useState(-1);

  // Debounced function for fetching address suggestions
  const fetchSuggestions = useCallback(
    debounce(async (query) => {
      if (query.length > 2) {
        try {
          const response = await axios.get(`https://api-adresse.data.gouv.fr/search/?q=${query}`);
          setSuggestions(response.data.features);
          setError(''); // Clear error message on successful fetch
          setActiveSuggestion(-1); // Reset active suggestion index
        } catch (err) {
          console.error('Error fetching address data:', err);
          setError('Failed to fetch address data. Please try again.');
        }
      } else {
        setSuggestions([]);
        setError(''); // Clear error message when input length is less than 3
        setActiveSuggestion(-1); // Reset active suggestion index
      }
    }, 300),
    [] // Dependencies array
  );

  const handleInputChange = (e) => {
    const query = e.target.value;
    onChange(query);
    fetchSuggestions(query);
  };

  const handleSuggestionClick = (suggestion) => {
    const address = suggestion.properties.label;
    onChange(address);
    setSuggestions([]);
    setError(''); // Clear error message when a suggestion is clicked
    setActiveSuggestion(-1); // Reset active suggestion index
  };

  const handleKeyDown = (e) => {
    if (suggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveSuggestion((prevIndex) =>
          prevIndex === suggestions.length - 1 ? 0 : prevIndex + 1
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveSuggestion((prevIndex) =>
          prevIndex === 0 ? suggestions.length - 1 : prevIndex - 1
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (activeSuggestion >= 0) {
          handleSuggestionClick(suggestions[activeSuggestion]);
        }
      }
    }
  };

  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (e.target.tagName !== 'LI') {
        setSuggestions([]);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <div className={`autocomplete-container ${className}`}>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="autocomplete-input"
      />
      {error && <div className="error">{error}</div>}
      <ul className="suggestions-list">
        {suggestions.map((suggestion, index) => (
          <li
            key={suggestion.properties.id}
            onClick={() => handleSuggestionClick(suggestion)}
            style={{ backgroundColor: activeSuggestion === index ? '#d3d3d3' : '#fff' }}
          >
            {suggestion.properties.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressAutocomplete;
