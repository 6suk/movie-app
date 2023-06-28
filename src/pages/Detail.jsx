import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const Detail = () => {
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const { data } = useSelector((state) => state.movies);

  // API 호출
  const getMovieAPI = async () => {
    try {
      const { data } = await axios.get(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`);
      const movie = await data.data.movie;
      setMovie(movie);
      setLoading(false);
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
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getMovie();
  }, []);

  return (
    <>
      <Header>
        <div onClick={() => nav(-1)}>
          <FontAwesomeIcon icon={faAngleLeft} />
          <p>뒤로가기</p>
        </div>
      </Header>
      <Section>
        <BackgrountImg image={movie.background_image_original}></BackgrountImg>
        <BackgroundOverlay></BackgroundOverlay>
        {!loading && (
          <Article>
            <img src={movie.large_cover_image} alt={movie.title} />
            <Info>
              <div className="item-top">
                <p>{movie.year}</p>
                <p>
                  <FontAwesomeIcon icon={faStar} className="star" /> {movie.rating}
                </p>
              </div>
              <div className="item-info">
                <div className="title">{movie.title}</div>
                <div className="desc">{movie.description_full}</div>
              </div>
            </Info>
          </Article>
        )}
      </Section>
    </>
  );
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

const Info = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 450px;
  color: #fff;
  text-align: left;
  gap: 0.5rem;
  justify-content: end;

  .title {
    font-size: 2.5rem;
    font-weight: 600;
  }
  .desc {
    padding-top: 1rem;
    font-size: 16px;
    line-height: 1.7rem;
    font-weight: 200;
    opacity: 0.9;

    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 15;
    -webkit-box-orient: vertical;
    word-break: keep-all;

    @media (min-width: 768px) {
      padding-top: 0.5rem;
    }
  }

  .item-top {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    padding-bottom: 0.5rem;
  }

  .item-top p {
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 1rem;
    padding-inline: 0.8rem;
    padding-block: 0.3rem;
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }

  .item-top p:first-child {
    background-color: rgba(59, 59, 59, 0.95);
    color: #fff;
  }

  .item-top p .star {
    color: #ff6a14;
  }
`;

const Header = styled.header`
  width: 100%;
  background-color: rgba(51, 51, 51, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  color: #e4e4e4;
  padding-block: 1.5rem;
  padding-left: 2rem;

  div {
    align-items: center;
    display: flex;
    gap: 0.5rem;
  }

  & * {
    cursor: pointer;
    font-weight: 600;
  }
`;

const Section = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    height: 100vh;
  }
`;

const Article = styled.article`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 0px;
  animation: ${ItemAnimation} 0.8s ease-in-out forwards;
  margin-block: 8rem;
  margin-inline: 3rem;
  gap: 5rem;

  img {
    width: 80%;
  }

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: normal;
    margin: 0rem;

    img {
      width: 40%;
    }
  }
`;

const BackgrountImg = styled.div`
  background: url(${(props) => props.image});
  background-size: cover;
  -webkit-background-size: cover;

  position: absolute;
  left: 0;
  right: 0;
  z-index: 1;
  display: block;
  width: 100%;
  height: 100%;
`;

const BackgroundOverlay = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: -moz-linear-gradient(top, rgba(29, 29, 29, 0.65) 0, rgba(29, 29, 29, 1) 100%);
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, rgba(29, 29, 29, 0.5)),
    color-stop(100%, rgba(29, 29, 29, 1))
  );
  background: -webkit-linear-gradient(top, rgba(29, 29, 29, 0.65) 0, rgba(29, 29, 29, 1) 100%);
  background: -o-linear-gradient(top, rgba(29, 29, 29, 0.65) 0, rgba(29, 29, 29, 1) 100%);
  background: -ms-linear-gradient(top, rgba(29, 29, 29, 0.65) 0, rgba(29, 29, 29, 1) 100%);
  background: linear-gradient(to bottom, rgba(29, 29, 29, 0.65) 0, rgba(29, 29, 29, 1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#801d1d1d',endColorstr='#1d1d1d',GradientType=0);
`;

export default Detail;
