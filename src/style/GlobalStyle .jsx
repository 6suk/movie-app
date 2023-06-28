import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  
  ul,
  li,
  p {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  body{
    color: #222;
    font-family: -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Pretendard Variable', Pretendard, 'DM Sans',
    Roboto, 'Noto Sans KR', 'Segoe UI', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
    sans-serif;
    letter-spacing: 0px;
    margin: 0;
    padding: 0;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none
  }
`;

export default GlobalStyle;
