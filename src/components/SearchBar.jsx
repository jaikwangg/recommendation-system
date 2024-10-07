import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import '../assets/styles/SearchBar.css';

const SearchBar = ({ setResults }) => {
    const [input, setInput] = useState('');

    const handleChange = (value) => {
        setInput(value);
        if (value) {
            setResults(value); // Pass the search input to the parent component for API search
        }
    };

    return (
        <div className="input-wrapper">
            <FaSearch id="search-icon" />
            <input
                placeholder="..What are you looking for?"
                value={input}
                onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;
