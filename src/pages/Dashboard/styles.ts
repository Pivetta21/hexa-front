import styled from 'styled-components';

export const DashboardContainer = styled.div``;

export const DashboardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const DashboardTitle = styled.h1`
  font-weight: 700;
  font-size: 32px;
`;

export const DashboardButtons = styled.div`
  display: flex;
  align-items: center;

  button {
    margin-left: 12px;
    width: 174px;
  }

  svg {
    fill: ${(props) => props.theme.colors.icon};
    width: 40px;
    height: 40px;

    :hover {
      cursor: pointer;
    }
  }
`;
