import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;
    colors: {
      body: string;
      text: string;
      caption: string;
      nav: string;
      icon: string;
    };
    commonColors: {
      magenta: string;
      lightBlack: string;
      black: string;
      white: string;
      lightSilver: string;
      silver: string;
      lightGray: string;
      gray: string;
      darkGray: string;
    };
    gradients: {
      primary: string;
    };
    shadows: {
      primary: string;
    };
    fontSizes: {
      heading: {
        large: string;
        medium: string;
        normal: string;
        small: string;
      };
      body: {
        large: string;
        medium: string;
        caption: string;
        normal: string;
        small: string;
        xSmall: string;
      };
    };
    spacings: {
      large: string;
      medium: string;
      normal: string;
      small: string;
      xSmall: string;
    };
  }
}
