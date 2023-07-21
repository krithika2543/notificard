import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Punchline from './Punchline';

const URL = 'https://official-joke-api.appspot.com/random_joke';

function App() {
  const [jokes, setJokes] = useState([]);
  const [jokePunches, setJokePunches] = useState([]);

  useEffect(() => {
    const fetchJoke = async () => {
      try {
        const response = await fetch(URL);
        const joke = await response.json();
        setJokes(prevJokes => [...prevJokes, joke.setup]);
        setJokePunches(prevJokePunches => [...prevJokePunches, joke.punchline]);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const interval = setInterval(fetchJoke, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
      <BrowserRouter>
       <div>
        <nav>
          {jokes.map((joke, index) => (
            <div key={index}>
              <Link to={`/punchline/${index}`}>
                <h2>{joke}</h2>
              </Link>
            </div>
          ))}
        </nav>
      </div>
      <Route path="/punchline/:index">
        <Punchline punchline={jokePunches} />
      </Route>
      </BrowserRouter>
    );

}

export default App;
