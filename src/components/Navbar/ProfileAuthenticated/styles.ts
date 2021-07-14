import styled from 'styled-components';

export const ProfileMenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const ProfileMenuImage = styled.div`
  display: flex;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;

  img {
    margin: 0 auto;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
    padding: 2px;
    background-color: ${(props) => props.theme.colors.icon};
  }

  &:hover {
    cursor: pointer;
  }
`;
