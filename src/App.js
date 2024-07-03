import React, { useState } from 'react';
import './App.css';

function App() {
  const [country, setCountry] = useState('');
  const [university, setUniversity] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when fetch starts

    let url = `http://universities.hipolabs.com/search?country=${encodeURIComponent(country)}`;
    if (university) {
      url += `&name=${encodeURIComponent(university)}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setResults(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false when fetch ends
    }
  };

  return (
    <div className="App">
      <h1>University Search</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="country">Country:</label>
        <input 
          type="text" 
          id="country" 
          name="country" 
          value={country} 
          onChange={(e) => setCountry(e.target.value)} 
          required 
        />
        <label htmlFor="university">University Name:</label>
        <input 
          type="text" 
          id="university" 
          name="university" 
          value={university} 
          onChange={(e) => setUniversity(e.target.value)} 
        />
        <button type="submit">Search</button>
      </form>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="card-container">
          {results.map((university, index) => (
            <div className="card" key={index}>
              <h2>{university.name}</h2>
              <p>Country: {university.country}</p>
              <p>State: {university['state-province']}</p>
              <p>
                Website: <a href={university.web_pages[0]} target="_blank" rel="noopener noreferrer">{university.web_pages[0]}</a>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
