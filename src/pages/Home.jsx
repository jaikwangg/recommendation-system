import { useState, useEffect } from 'react';
import '../assets/styles/Home.css';
import SearchBar from '../components/SearchBar';
import ButtonGroup from '../components/ButtonGroup';
import { Link } from 'react-router-dom';

const Home = () => {
  const [results, setResults] = useState([]); // Store the search results
  const [initialItems, setInitialItems] = useState([]); // Store initial items
  const [isSearchPerformed, setIsSearchPerformed] = useState(false); // Track if a search was performed
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  // Fetch initial items when component mounts
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    console.log('Fetching initial items...'); // Debug log

    // Try using the searchbyuser endpoint instead with an empty query
    fetch('http://ffancy.xyz:5000/api/fashion/searchbyuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'query': '', // Empty query to get all items
      }),
    })
      .then((response) => {
        console.log('Response status:', response.status);
        return response.json();
      })
      .then((data) => {
        console.log('API Response:', data);

        if (data && data.results && data.results.length > 0) {
          // Get up to 8 random items from the results
          const shuffled = [...data.results].sort(() => 0.5 - Math.random());
          const selected = shuffled.slice(0, 20);
          setInitialItems(selected);
          console.log('Selected items:', selected);
        } else {
          // If the first attempt fails, try with a very generic search term
          return fetch('http://ffancy.xyz:5000/api/fashion/searchbyuser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              'query': 'fashion', // Generic term that might match more items
            }),
          }).then(response => response.json());
        }
      })
      .then((data) => {
        if (data && data.results && data.results.length > 0) {
          const shuffled = [...data.results].sort(() => 0.5 - Math.random());
          const selected = shuffled.slice(0, 20);
          setInitialItems(selected);
        } else {
          setError('No items available');
        }
      })
      .catch((error) => {
        console.error('Error fetching initial items:', error);
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const searchByUser = (query) => {
    setIsSearchPerformed(true);
    setIsLoading(true);
    fetch('http://ffancy.xyz:5000/api/fashion/searchbyuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'query': query,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.results && data.results.length > 0) {
          setResults(data.results);
        } else {
          setResults([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
        setResults([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const searchByCategory = (category) => {
    setIsSearchPerformed(true);
    setIsLoading(true);
    fetch('http://ffancy.xyz:5000/api/fashion/searchbytype', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'query': category,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.results && data.results.length > 0) {
          setResults(data.results);
        } else {
          setResults([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching category results:', error);
        setResults([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="home-page">
      <div className="search-bar-container">
        <SearchBar setResults={searchByUser} />
        <div className="button-group-container">
          <ButtonGroup searchByCategory={searchByCategory} />
        </div>
      </div>
      <div className="grid">
        {results.length > 0 ? (
          results.map((item) => (
            // ใน map() function ของผลลัพธ์สินค้า
            <Link to={`/product/${item.id}`} key={item.id} className="card">
              <img
                src={`http://ffancy.xyz:5000/static/images/${item.image}`}
                alt={item.productDisplayName}
                className="card-image"
              />
              <div className="card-content">
                <p className="card-title">{item.productDisplayName}</p>
              </div>
            </Link>
          ))
        ) : isSearchPerformed ? (
          <h2>No items found.</h2>
        ) : isLoading ? (
          <h2>Loading items...</h2>
        ) : error ? (
          <h2>Error: {error}</h2>
        ) : initialItems.length > 0 ? (
          initialItems.map((item) => (
            <Link key={item.id} to={`/product/${item.id}`} className="card">
              <img
                src={`http://ffancy.xyz:5000/static/images/${item.image}`}
                alt={item.productDisplayName}
                className="card-image"
              />
              <div className="card-content">
                <p className="card-title">{item.productDisplayName}</p>
              </div>
            </Link>
          ))
        ) : (
          <h2>No items available.</h2>
        )}
      </div>
    </div>
  );
};

export default Home;