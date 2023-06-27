import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMovies } from '../store/movieSlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(20);
  const [loading, setLoading] = useState(true);
  let { movies } = useSelector((state) => state);
  movies = movies.data;

  const handleMoreView = () => {
    setLimit(limit + 10);
  };

  const getMovieData = async () => {
    try {
      const { data } = await axios.get(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year&limit=${limit}`
      );
      const movies = await data.data.movies;
      dispatch(setMovies(movies));
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMovieData();
  }, [limit]);

  return (
    <section>
      <div className="container">
        <ul>{!loading && <MovieCards movies={movies} />}</ul>
        <button
          type="button"
          onClick={() => {
            handleMoreView();
          }}>
          더보기
        </button>
      </div>
    </section>
  );
};

const MovieCards = ({ movies }) => {
  const nav = useNavigate();

  return movies.map((movie) => (
    <li key={movie.id} onClick={() => nav(`/detail/${movie.id}`)}>
      <article>
        <img src={movie.medium_cover_image} alt={movie.title} />
        <p>
          {movie.title}
          <span>{movie.year}</span>
        </p>
        <p>{movie.rating}</p>
        <p>{movie.summary}</p>
      </article>
    </li>
  ));
};
export default Home;
