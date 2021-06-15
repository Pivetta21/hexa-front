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
  }

  body {
    font-size: 100%;
    font-family: 'Poppins', sans-serif;
    background-color: ${(props) => props.theme.colors.body};
    color: ${(props) => props.theme.colors.text}
  }
`;
