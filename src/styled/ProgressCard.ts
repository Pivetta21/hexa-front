import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { lighten, invert } from 'polished';

export const ProgressCard = styled(Link)`
  margin-bottom: 12px;
  padding: 12px;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.text};

  background-color: ${(props) =>
    lighten(0.07, invert(props.theme.colors.text))};

  img {
    width: 60px;
    min-width: 60px;
    height: 60px;
    min-height: 60px;
    border-radius: 50%;
    margin-right: 12px;
    object-fit: cover;
    object-position: center;
  }

  h1 {
    width: 320px;
    font-weight: 600;
    height: 24px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  span {
    display: block;
    margin-top: 4px;
    color: ${(props) => props.theme.colors.caption};
  }

  @media (max-width: 1100px) {
    h1 {
      width: 100% !important;
    }
  }
`;
