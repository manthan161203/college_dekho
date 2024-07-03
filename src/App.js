import React, { useState } from 'react';
import './App.css';

function App() {
  const [country, setCountry] = useState('');
  const [university, setUniversity] = useState('');
  const [results, setResults] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://universities.hipolabs.com/search?name=${encodeURIComponent(university)}&country=${encodeURIComponent(country)}`);
      const data = await response.json();
      console.log(data)
      setResults(data);
    } catch (error) {
      console.error('Error fetching data:', error);
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
          onChange={(e) => setCountry(e.target.value)} // e is the event object passed by onChange
          required 
        />
        <label htmlFor="university">University Name:</label>
        <input 
          type="text" 
          id="university" 
          name="university" 
          value={university} 
          onChange={(e) => setUniversity(e.target.value)} // e is the event object passed by onChange
          required 
        />
        <button type="submit">Search</button>
      </form>
      <div className="card-container">
        {results.map((university, index) => (
          <div className="card" key={index}>
            <h2>{university.name}</h2>
            <p>Country: {university.country}</p>
            <p>State: {university['state-province']}</p>
            <p>
              Website: <a href={university.web_page}>{university.web_pages}</a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
