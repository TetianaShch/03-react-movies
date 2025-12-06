import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

import css from './App.module.css';

import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import type { Movie } from '../../types/movie';
import { searchMovies } from '../../services/api';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
  
    setMovies([]);
    setError(null);
    setIsLoading(true);

    try {
      const results = await searchMovies(query);

      if (results.length === 0) {
        toast.error('No movies found for your request.');
        return;
      }

      setMovies(results);
    } catch (err) {
      console.error(err);
      setError('Something went wrong, please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />

      {error && <ErrorMessage message={error} />}

      {isLoading && <Loader />}

      {!isLoading && !error && movies.length > 0 && (
        <MovieGrid
          movies={movies}
          onSelect={movie => {
            // тут потім підʼєднаємо модалку
            console.log('Selected movie:', movie.title);
          }}
        />
      )}

      <Toaster position="top-right" />
    </div>
  );
}





