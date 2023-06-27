import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const Detail = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const { data } = useSelector((state) => state.movies);

  // API 호출
  const getMovieAPI = async () => {
    try {
      const { data } = await axios.get(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`);
      const movie = await data.data.movie;
      setMovie(movie);
    } catch (err) {
      console.log(err);
    }
  };

  // 저장된 State에서 가져오기 (Redux)
  const getMovie = () => {
    const findMovie = data.find((movie) => movie.id === Number(id));
    if (!findMovie) {
      nav('/');
    } else {
      setMovie(findMovie);
    }
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <section>
      <article>
        <img src={movie.medium_cover_image} alt={movie.title} />
        <p>
          {movie.title}
          <span>{movie.year}</span>
        </p>
        <p>{movie.rating}</p>
        <p>{movie.description_full}</p>
      </article>
    </section>
  );
};

export default Detail;
