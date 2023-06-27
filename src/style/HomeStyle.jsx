import styled, { keyframes } from 'styled-components';

const OtherUserCardAnimation = keyframes`
  0% {
    opacity: 0;
    top: 50px;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
    top: -50px;
  }
`;

const Article = styled.li`
  width: 70%;
  height: auto;
  margin: 0 auto;
  position: relative;
  top: -50px;
  animation: ${OtherUserCardAnimation} 0.8s ease-in-out forwards;
  animation-delay: 0.5s;
`;

export { OtherUserCardAnimation, Article };
