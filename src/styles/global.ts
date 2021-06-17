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

  html, body, #root {
    height: 100%;
  }

  .main {
    padding-top: 60px;
    padding-left: 278px;
    height: 100%;

    @media (max-width: 900px) {
      padding-left: 80px;
    }

    @media (max-width: 500px) {
      padding-left: 0;
      padding-bottom: 60px;
    }
  }

  .wrapper {
    display: grid;
    height: 100%;
    width: 100%;
    padding: ${(props) => props.theme.spacings.medium};
  }
`;
