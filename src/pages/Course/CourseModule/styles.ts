import { lighten, invert, transparentize } from 'polished';
import styled from 'styled-components';

export const CourseModuleContainer = styled.div``;

export const CourseModuleVideo = styled.video`
  height: 450px;
  width: 100%;
  background-color: black;
  border-radius: 12px;
`;

export const CourseVideoGrid = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

export const CourseVideoInfo = styled.div`
  margin-right: 24px;
  width: 100%;
`;

export const CourseVideoDescription = styled.div`
  margin-top: 14px;
  margin-bottom: 8px;
`;
export const CourseVideoDetails = styled.div`
  display: flex;
  align-items: center;

  img {
    height: 72px;
    min-height: 72px;
    width: 72px;
    min-width: 72px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
    margin-right: 16px;
  }

  > div {
    p {
      font-weight: 600;
      color: ${(props) => props.theme.commonColors.magenta};
    }

    h1 {
      font-size: ${(props) => props.theme.fontSizes.body.large};
    }
  }
`;

export const CourseModuleInfo = styled.div`
  min-width: 380px;
  padding: 14px 18px;
  border-radius: 12px;

  background-color: ${(props) =>
    lighten(0.07, invert(props.theme.colors.text))};
`;

export const CourseInfoName = styled.div`
  font-size: 1.15rem;
  margin-bottom: 12px;
  font-weight: 600;
  background: ${(props) => props.theme.gradients.primary};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const CourseInfoModule = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 16px;
  margin-bottom: 16px;
`;

export const CourseInfoModuleName = styled.div`
  font-size: ${(props) => props.theme.fontSizes.body.medium};
  font-weight: 600;
`;
export const CourseInfoModuleNav = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;

  a {
    &.marginR {
      margin-right: 8px;
    }

    &.marginL {
      margin-left: 8px;
    }
  }

  a,
  svg {
    height: 18px;
    width: 18px;
  }

  svg {
    fill: ${(props) => props.theme.colors.icon};
  }

  span {
    font-weight: 600;
  }
`;

export const CourseInfoModuleVideos = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  margin-top: 10px;

  a {
    width: 100%;
    color: ${(props) => props.theme.colors.text};
    background-color: ${(props) =>
      transparentize(0.92, props.theme.colors.text)};
    border-radius: 12px;
    padding: 12px 16px;
  }
`;
