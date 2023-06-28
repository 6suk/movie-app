import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMovies, setLimit } from '../store/movieSlice';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const dispatch = useDispatch();
  const [numColumns, setNumColumns] = useState(1);
  const [more, setMore] = useState(true);
  const [loading, setLoading] = useState(true);
  let { movies } = useSelector((state) => state);
  const limit = movies.limit;
  movies = movies.data;

  const handleMoreView = () => {
    dispatch(setLimit());
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
    if (limit === 50) setMore(false);
    if (movies.length !== limit) getMovieData();
    else setLoading(false);
  }, [limit]);

  return (
    <Section>
      <Container>
        {!loading && (
          <>
            <ItemList>
              <MovieCards movies={movies} />
            </ItemList>
            {more && (
              <MoreButton
                type="button"
                onClick={() => {
                  handleMoreView();
                }}>
                더보기
              </MoreButton>
            )}
          </>
        )}
      </Container>
    </Section>
  );
};

const MovieCards = ({ movies }) => {
  const nav = useNavigate();

  const noImage = (e) => {
    e.target.parentNode.parentNode.parentNode.style.display = 'none';
  };

  return movies.map((movie) => (
    <Item key={movie.id} onClick={() => nav(`/detail/${movie.id}`)}>
      <Article>
        <Img>
          <div className="item-top">
            <p>{movie.year}</p>
            <p>
              <FontAwesomeIcon icon={faStar} className="star" /> {movie.rating}
            </p>
          </div>
          <img src={movie.large_cover_image} alt={movie.title} onError={noImage} />
        </Img>
        <Info>
          <p className="title">{movie.title}</p>
          <p className="desc">{movie.summary}</p>
        </Info>
      </Article>
    </Item>
  ));
};

const ItemAnimation = keyframes`
  0% {
    opacity: 0;
    top: 80px;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
    top: 0px;
  }
`;

const Section = styled.section`
  margin-top: 5rem;
  margin-bottom: 10rem;
`;

const Container = styled.div`
  position: relative;
`;

const ItemList = styled.ul`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(17.5rem, 1fr));
  grid-gap: 1.5625rem;
  row-gap: 3.125rem;
  padding-inline: 2rem;

  @media (min-width: 768px) {
    padding-inline: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(17.5rem, 1fr));
  }
`;

const Item = styled.li`
  transition: all 0.3s cubic-bezier(0, 0, 0.5, 1);
  cursor: pointer;

  &:hover {
    transition: all 0.3s cubic-bezier(0, 0, 0.5, 1);
    transform: scale3d(1.01, 1.01, 1.01);
  }

  @media (min-width: 768px) {
    display: grid;
    grid-template-rows: auto 1fr auto;
  }
`;

const Article = styled.article`
  padding: 1.5rem;

  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  align-items: center;

  top: 0px;
  animation: ${ItemAnimation} 0.8s ease-in-out forwards;
  background-color: #fff;
  box-shadow: 2px 4px 12px rgb(0 0 0 / 8%);
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
  padding-bottom: 0.5rem;
  padding-inline: 0.5rem;
  gap: 1rem;

  @media (min-width: 768px) {
    margin-top: 1rem;
    margin-bottom: 0rem;
    padding-inline: 0rem;
    padding-bottom: 0rem;
    gap: 0.5rem;
  }

  .title {
    font-size: 1.25rem;
    font-weight: 600;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: keep-all;

    @media (min-width: 768px) {
      font-size: 1rem;
    }
  }
  .desc {
    line-height: 20px;
    color: #777;
    font-weight: 300;
    font-size: 1rem;

    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    word-break: keep-all;

    min-height: 60px;

    @media (min-width: 768px) {
      font-size: 0.875rem;
    }
  }
`;

const Img = styled.div`
  position: relative;

  img {
    width: 100%;
  }

  .item-top {
    width: -webkit-fill-available;
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem;
    letter-spacing: 0.5px;
  }

  .item-top p {
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 1rem;
    padding-inline: 0.8rem;
    padding-block: 0.3rem;
    font-size: 1rem;
    font-weight: 600;
  }

  .item-top p:first-child {
    background-color: rgba(32, 39, 47, 0.95);
    color: #fff;
  }

  .item-top p .star {
    color: #ff6a14;
  }

  @media (min-width: 768px) {
    .item-top {
      padding: 0.6rem;
    }
    .item-top p {
      font-size: 0.875rem;
    }
  }
`;

const MoreButton = styled.button`
  cursor: pointer;
  margin-top: 3rem;
  margin: 3rem auto;
  font-family: Pretendard;
  font-size: 1rem;
  border: none;
  width: 80%;
  padding-block: 1rem;
  border-radius: 10px;
  background-color: #222;
  color: #fff;
  box-shadow: 2px 4px 12px rgb(0 0 0 / 5%);
  transition: all 0.3s cubic-bezier(0, 0, 0.5, 1);

  &:hover {
    transition: all 0.3s cubic-bezier(0, 0, 0.5, 1);
    transform: scale3d(1.02, 1.02, 1.02);
  }

  @media (min-width: 768px) {
    width: 280px;
  }
`;

export default Home;
