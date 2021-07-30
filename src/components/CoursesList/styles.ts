import styled from 'styled-components';
import { transparentize } from 'polished';

export const CoursesListContainer = styled.div`
  &.column {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    grid-template-rows: 1fr;
    row-gap: 20px;
    column-gap: 16px;

    @media (max-width: ${(props) => props.theme.breakpoints.nav.mobile}) {
      display: flex;
      flex-direction: column;
    }
  }

  &.row {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    grid-template-rows: 276px;
    height: 284px;
    row-gap: 20px;
    column-gap: 16px;
    grid-auto-rows: 0;
    overflow: hidden;
  }
`;

export const CourseItemContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  user-select: none;

  img {
    object-fit: cover;
    object-position: center;
  }

  :hover {
    cursor: pointer;
    filter: drop-shadow(${(props) => props.theme.shadows.big});
  }
`;

export const CourseItemImage = styled.img`
  min-width: 100%;
  height: 200px;
  min-height: 200px;
  background-color: ${(props) => transparentize(0.92, props.theme.colors.text)};
`;

export const CourseItemBadges = styled.div`
  position: absolute;
  right: 8px;
  top: 8px;
  text-transform: uppercase;
  font-size: ${(props) => props.theme.fontSizes.body.small};
  font-weight: 600;
  user-select: none;

  span {
    padding: 2px 6px;
    color: ${(props) => props.theme.commonColors.white};
    background-image: ${(props) => props.theme.gradients.primary};
    margin-left: 8px;
    border-radius: 4px;
    box-shadow: ${(props) => props.theme.shadows.primary};
  }
`;

export const CourseItemAuthor = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 16px;
  margin-top: 12px;

  img {
    background-color: ${(props) =>
      transparentize(0.92, props.theme.colors.text)};
    height: 64px;
    min-height: 64px;
    width: 64px;
    min-width: 64px;
    border-radius: 50%;
  }
`;

export const CourseItemAuthorInfo = styled.div`
  overflow: hidden;

  h1 {
    font-size: ${(props) => props.theme.fontSizes.body.medium};
    font-weight: 600;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    letter-spacing: 0.5px;
  }

  p {
    color: ${(props) => props.theme.colors.caption};
    font-size: ${(props) => props.theme.fontSizes.body.normal};
    font-weight: 400;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    letter-spacing: 0.35px;
  }
`;
