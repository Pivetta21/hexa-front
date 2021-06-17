import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *, 
  *:after,
  *:before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    list-style: none;
    font-size: 100%;
  }

  html {
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
  }

  body {
    background-color: ${(props) => props.theme.colors.body};
    color: ${(props) => props.theme.colors.text}
  }
`;
