import styled from 'styled-components';
import { shade } from 'polished';

export const NavContainer = styled.nav`
  height: 60px;
  background-color: ${(props) => props.theme.colors.navbar};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;

  > ul {
    display: flex;

    a {
      color: ${(props) => props.theme.colors.text};
      padding: 20px;

      &:hover {
        background-color: ${(props) => shade(0.1, props.theme.colors.navbar)};
      }
    }
  }
`;
