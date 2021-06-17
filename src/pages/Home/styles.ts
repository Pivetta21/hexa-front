import styled from 'styled-components';

export const Header = styled.h1`
  font-size: ${(props) => props.theme.fontSizes.heading.normal};
  font-weight: 700;
  padding: ${(props) => props.theme.spacings.medium};
`;
