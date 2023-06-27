import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMovies } from '../store/movieSlice';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

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
  margin-top: 10rem;
  margin-bottom: 10rem;
`;

const Container = styled.div`
  position: relative;
`;

const ItemList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 25px;
  row-gap: 50px;
  grid-auto-rows: max-content;
  max-width: 1200px;
  margin: 0 auto;
  width: min-content;
`;

const Item = styled.li`
  transition: all 0.3s cubic-bezier(0, 0, 0.5, 1);
  display: flex;
  margin: 0 auto;
  cursor: pointer;

  &:hover {
    transition: all 0.3s cubic-bezier(0, 0, 0.5, 1);
    transform: scale3d(1.01, 1.01, 1.01);
  }
`;

const Article = styled.article`
  padding: 1.5rem;
  position: relative;
  width: 230px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 0px;
  animation: ${ItemAnimation} 0.8s ease-in-out forwards;
  background-color: #fff;
  box-shadow: 2px 4px 12px rgb(0 0 0 / 8%);
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  gap: 0.5rem;

  .title {
    font-weight: 600;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: keep-all;
  }
  .desc {
    line-height: 20px;
    color: #777;
    font-weight: 300;
    font-size: 14px;

    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    word-break: keep-all;
  }
`;

const Img = styled.div`
  position: relative;

  img {
    width: 100%;
  }

  img.none {
    background-color: #ececec;
    width: fit-content;
  }

  .item-top {
    width: -webkit-fill-available;
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0.5rem;
  }

  .item-top p {
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 1rem;
    padding-inline: 0.8rem;
    padding-block: 0.3rem;
    font-size: 14px;
    font-weight: 600;
  }

  .item-top p:first-child {
    background-color: rgba(32, 39, 47, 0.95);
    color: #fff;
  }

  .item-top p .star {
    color: #ff6a14;
  }
`;

const MoreButton = styled.button`
  cursor: pointer;
  margin-top: 3rem;
  font-family: Pretendard;
  font-size: 16px;
  border: none;
  width: 250px;
  height: 50px;
  border-radius: 10px;
  background-color: #222;
  color: #fff;
  box-shadow: 2px 4px 12px rgb(0 0 0 / 5%);
  transition: all 0.3s cubic-bezier(0, 0, 0.5, 1);

  &:hover {
    transition: all 0.3s cubic-bezier(0, 0, 0.5, 1);
    transform: scale3d(1.01, 1.01, 1.01);
  }
`;

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
    <Section>
      <Container>
        {!loading && (
          <>
            <ItemList>
              <MovieCards movies={movies} />
            </ItemList>
            <MoreButton
              type="button"
              onClick={() => {
                handleMoreView();
              }}>
              더보기
            </MoreButton>
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

export default Home;
