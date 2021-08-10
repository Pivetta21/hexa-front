import { transparentize, lighten, invert } from 'polished';
import styled from 'styled-components';

export const CourseOverviewListContainer = styled.div`
  min-width: 525px;
`;

export const OverviewListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => transparentize(0.92, props.theme.colors.text)};
  font-size: ${(props) => props.theme.fontSizes.body.medium};
  font-weight: 600;
  padding: 12px 16px;

  svg {
    fill: ${(props) => props.theme.colors.icon};
    height: 20px;
    width: 20px;
    pointer-events: none;
    user-select: none;
    transform: rotate(270deg);

    &.open {
      transform: rotate(90deg);
    }
  }

  &:hover {
    cursor: pointer;
  }
`;

export const OverviewListUl = styled.ul`
  display: none;
  background-color: ${(props) =>
    lighten(0.02, invert(props.theme.colors.text))};

  li {
    margin-bottom: 12px;
    margin-left: 16px;
    margin-right: 16px;
    padding: 12px 20px;
    border-radius: 14px;
    background-color: ${(props) =>
      lighten(0.07, invert(props.theme.colors.text))};

    :first-child {
      margin-top: 16px;
    }
    :last-child {
      margin-bottom: 16px;
    }

    :hover {
      cursor: pointer;
    }
  }

  &.show {
    display: flex;
    flex-direction: column;
  }
`;
