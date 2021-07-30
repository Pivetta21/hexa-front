import { invert, lighten, transparentize } from 'polished';
import styled from 'styled-components';

export const DashboardCoursesListContainer = styled.div`
  margin-top: ${(props) => props.theme.spacings.normal};
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

export const DashboardCoursesListItem = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 170px;

  background-color: ${(props) =>
    lighten(0.07, invert(props.theme.colors.text))};

  &:hover {
    cursor: pointer;
    box-shadow: ${(props) => props.theme.shadows.big};
  }

  &:hover .course-options {
    display: flex;
    animation: fadein 300ms ease-in-out;

    @keyframes fadein {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }

  img {
    pointer-events: none;
    user-select: none;
    width: 230px;
    min-width: 230px;
    height: 170px;
    min-height: 170px;
    object-fit: cover;
    object-position: center;
  }

  @media (max-width: 1100px) {
    img {
      display: none;
    }
  }
`;

export const DashboardCoursesListInfo = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  padding: 16px 20px;
  overflow: hidden;
  height: 100%;

  h1 {
    font-size: ${(props) => props.theme.fontSizes.body.large};
    font-weight: 600;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    white-space: nowrap;
    overflow: hidden;
    letter-spacing: 0.5px;
    user-select: none;
  }

  p {
    user-select: none;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-size: ${(props) => props.theme.fontSizes.body.medium};
    font-weight: 400;
    letter-spacing: 0.35px;
  }
`;

export const DashboardCoursesListOptions = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: ${(props) =>
    transparentize(0.1, invert(props.theme.colors.text))};
  backdrop-filter: blur(2px);
`;

export const DashboardCoursesListOption = styled.div`
  display: flex;
  column-gap: 8px;
  margin-right: 24px;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.theme.fontSizes.body.normal};
  color: ${(props) => props.theme.colors.icon};
  user-select: none;

  svg {
    fill: ${(props) => props.theme.colors.icon};
  }

  :last-child {
    margin-right: 0px;
  }

  :hover {
    color: ${(props) => props.theme.commonColors.magenta};
    filter: drop-shadow(2px 2px 10px rgba(0, 0, 0, 0.35));

    svg {
      fill: ${(props) => props.theme.commonColors.magenta};
    }
  }
`;
