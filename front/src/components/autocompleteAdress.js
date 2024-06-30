import React, { useState } from 'react';
import axios from 'axios';

const AddressAutocomplete = ({ value, onChange }) => {
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    const query = e.target.value;
    onChange(query);

    if (query.length > 2) {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1`);
      setSuggestions(response.data);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const address = `${suggestion.address.road}, ${suggestion.address.city}, ${suggestion.address.country}`;
    onChange(address);
    setSuggestions([]);
  };

  return (
    <div>
      <input type="text" value={value} onChange={handleInputChange} />
      <ul>
        {suggestions.map((suggestion) => (
          <li key={suggestion.place_id} onClick={() => handleSuggestionClick(suggestion)}>
            {suggestion.display_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressAutocomplete;
