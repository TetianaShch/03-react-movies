import { Toaster } from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar';
import css from './App.module.css';

export default function App() {
  const handleSearch = (query: string) => {
   void query; // unused
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />

      {/*  MovieGrid, Loader, ErrorMessage, MovieModal */}
      <Toaster position="top-right" />
    </div>
  );
}




