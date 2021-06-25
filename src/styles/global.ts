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
    color: ${(props) => props.theme.colors.text};
    overflow-x: hidden;
    overflow-y: hidden;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
  }

  #root {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: ${(props) => props.theme.sizes.nav.navbarHeight} 1fr;
    grid-template-columns: ${(props) => props.theme.sizes.nav.sidenavWeb} 1fr;
    grid-template-areas: 
      "navbar navbar"
      "sidenav main";

    @media (max-width: ${(props) => props.theme.breakpoints.nav.tablet}) {
      grid-template-columns: 
        ${(props) => props.theme.sizes.nav.sidenavTablet} 1fr;
    }

    @media (max-width: ${(props) => props.theme.breakpoints.nav.mobile}) {
      grid-template-rows: 
        ${(props) => props.theme.sizes.nav.navbarHeight}
        1fr
        ${(props) => props.theme.sizes.nav.sidenavMobile};
      grid-template-columns: 1fr;
      grid-template-areas: 
        "navbar"
        "main"
        "sidenav";
    }
  }

  .main {
    grid-area: main;
    padding: ${(props) => props.theme.spacings.medium};

    @media (max-width: ${(props) => props.theme.breakpoints.nav.mobile}) {
      padding: ${(props) => props.theme.spacings.normal};
    }
  }

  .scroller {
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-color: ${(props) =>
      props.theme.colors.scrollbar.thumb + props.theme.colors.scrollbar.track};
    scrollbar-width: thin;
  }

  .scroller::-webkit-scrollbar {
    width: 8px;
  }

  .scroller::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.colors.scrollbar.track};
  }

  .scroller::-webkit-scrollbar-thumb {  
    background-color: ${(props) => props.theme.colors.scrollbar.thumb};
  }
`;
