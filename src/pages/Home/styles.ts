import styled from 'styled-components';

export const Header = styled.h1`
  font-size: ${(props) => props.theme.fontSizes.heading.normal};
  font-weight: 700;
  margin-bottom: ${(props) => props.theme.spacings.small};
`;
