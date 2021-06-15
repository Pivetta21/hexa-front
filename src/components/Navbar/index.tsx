import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Link } from 'react-router-dom';

import { NavContainer } from './styles';

interface Props {
  toggleTheme(): void;
}

const Navbar: React.FC<Props> = ({ toggleTheme }) => {
  const { colors, title } = useContext(ThemeContext);

  return (
    <NavContainer>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
      <button
        style={{
          borderRadius: '30px',
          padding: '12px 16px',
          color: colors.primary,
        }}
        onClick={() => {
          toggleTheme();
        }}
      >
        Theme: {title.charAt(0).toUpperCase() + title.substr(1)}
      </button>
    </NavContainer>
  );
};

export default Navbar;
