import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import MovieCard from "../components/MovieCard";
import { AuthContext } from "../context/AuthContext";

const API_KEY = "507a4b4cb02308ec113ff1e6398aa50d";
// const API_KEY = process.env.REACT_APP_TMDB_KEY;
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const Main = () => {
  const [movie, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState("");
  const {currentUser} = useContext(AuthContext);
  useEffect(() => {
    getMovies(FEATURED_API)
  }, [])

  const getMovies = (API) =>{
    axios
    .get(API)
    .then(res => setMovies(res.data.results))
    .catch((err) => console.log(err))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm && currentUser){
      getMovies(SEARCH_API + searchTerm)
    } else if (!currentUser){
      alert("Please log in to search a movie!")
    } else {
      alert("Please enter a text!")
    };
  };
  return (
  <div>
    <form className="search" onSubmit={handleSubmit}>
        <input
          type="search"
          className="search-input"
          placeholder="Search a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    <div className="d-flex justify-content-center flex-wrap">
      {movie.map(movie => (
        <MovieCard key={movie.id} {...movie}/> // movie={movie} same with {...movie}
      ))}
    </div>
  </div>
  );
};

export default Main;
