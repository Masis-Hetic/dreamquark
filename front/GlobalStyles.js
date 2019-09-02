import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
  
  *, *:before, *:after {
    box-sizing: border-box;
  }
  
  body {
    font-family: sans-serif;
    background: #fafafa;
  }
  
  ul {
    list-style-type: none;
  }
  
  a {
    text-decoration: none;
    color: #000;
  }
`;

export default GlobalStyle;
