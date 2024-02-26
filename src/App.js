import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);



  const fetchMovieHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://swapi.dev/api/films');
      if (!response.ok) {
        throw new Error("Something went wrong")
      }
      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          releaseDate: movieData.release_date,
          openingText: movieData.opening_crawl,
        }
      });
      setMovies(transformedMovies);
    } catch (err) {
      setError(err.message)
    }
    setIsLoading(false)

  }, []);

  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler])
  // const fetchMovieHandler = () => {
  //   fetch('https://swapi.dev/api/films').then((response) => {
  //     return response.json()
  //   }).then((data) => {
  //     const transformedMovies = data.results.map((movieData) => {
  //       return {
  //         id: movieData.episode_id,
  //         title: movieData.title,
  //         releaseDate: movieData.release_date,
  //         openingText: movieData.opening_crawl,
  //       }
  //     });
  //     setMovies(transformedMovies)

  //   })
  // }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler} disabled={(!isLoading && movies.length > 0) || isLoading}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>Found no movies</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
