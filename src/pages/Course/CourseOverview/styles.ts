import { invert, lighten, transparentize } from 'polished';
import styled from 'styled-components';

export const CourseOverviewContainer = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 1150px) {
    flex-direction: column;
  }
`;

export const CourseOverviewHeader = styled.div`
  display: flex;
  position: relative;

  h1 {
    margin-bottom: 12px;
    font-size: ${(props) => props.theme.fontSizes.heading.normal};
    font-weight: 700;
  }
`;

export const CourseOverviewText = styled.h2`
  font-size: ${(props) => props.theme.fontSizes.body.medium};
  font-weight: 600;
  letter-spacing: 0.5px;
`;

export const CourseHeaderImage = styled.img`
  width: 180px;
  min-width: 180px;
  height: 180px;
  min-height: 180px;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  background-color: ${(props) =>
    lighten(0.07, invert(props.theme.colors.text))};

  @media (max-width: 1150px) {
    display: none;
  }
`;

export const CourseHeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 32px;

  @media (max-width: 1150px) {
    margin-left: 0px;
  }
`;

export const CourseHeaderRate = styled.div`
  margin-left: -4px;
  margin-top: 16px;

  svg {
    height: 40px;
    width: 40px;
    fill: ${(props) => transparentize(0.92, props.theme.colors.text)};

    :hover {
      cursor: pointer;
      transform: translateY(-4px);
    }
  }

  svg.active {
    fill: ${(props) => props.theme.commonColors.magenta};
  }
`;

export const CourseOverviewDetails = styled.div`
  width: fit-content;
  display: grid;
  width: 100%;
  grid-template-columns: 1fr auto;
  margin-top: 32px;

  @media (max-width: 1150px) {
    display: flex;
    flex-direction: column-reverse;
  }
`;

export const CourseOverviewDetailsContent = styled.div`
  margin-right: 60px;

  h2 {
    margin-bottom: 16px;
  }

  p {
    margin-bottom: 24px;
  }

  @media (max-width: 1150px) {
    margin-top: 24px;
    margin-right: 0px;
  }
`;

export const CourseOverviewInfo = styled.div`
  min-width: 230px;

  button {
    margin-bottom: 24px;
    width: 100%;
  }
`;

export const CourseOverviewCreator = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 24px;

  h2 {
    margin-bottom: 12px;
  }

  a {
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.colors.text};

    > div {
      width: 100%;
    }

    :hover {
      cursor: pointer;
    }
  }

  img {
    width: 60px;
    min-width: 60px;
    height: 60px;
    min-height: 60px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
    margin-right: 8px;
  }

  p {
    font-size: ${(props) => props.theme.fontSizes.body.medium};
    letter-spacing: 0.35px;
  }

  span {
    color: ${(props) => props.theme.colors.caption};
    letter-spacing: 0.35px;
  }

  @media (max-width: 1150px) {
    display: none;
  }
`;
