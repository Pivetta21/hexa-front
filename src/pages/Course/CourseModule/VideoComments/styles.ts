import styled from 'styled-components';

export const VideoCommentsContainer = styled.div`
  margin-top: 32px;
`;

export const VideoCommentForm = styled.form`
  position: relative;
  display: flex;

  img {
    width: 52px;
    min-width: 52px;
    height: 52px;
    min-height: 52px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
    margin-right: 12px;
  }

  > div {
    position: relative;
    width: 100%;
  }

  textarea {
    margin-top: 0px;
    min-height: 98px;
    height: auto;
    padding-right: 120px;
    overflow: hidden;
  }

  p {
    position: absolute;
    text-transform: uppercase;
    right: 12px;

    :hover {
      cursor: pointer;
      user-select: none;
    }
  }

  p.reset {
    bottom: 36px;
  }

  p.send {
    bottom: 6px;
    color: ${(props) => props.theme.commonColors.magenta};
  }
`;

export const VideoCommentsList = styled.div`
  margin-top: 12px;
  display: flex;

  img {
    width: 52px;
    min-width: 52px;
    height: 52px;
    min-height: 52px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
    margin-right: 12px;
  }

  &.hide {
    display: none;
  }
`;

export const VideoCommentBlock = styled.div`
  width: 100%;

  > div {
    display: flex;
    justify-content: space-between;
  }

  h1 {
    font-weight: 600;
    margin-right: 12px;
    margin-bottom: 4px;
  }

  span {
    display: inline-block;
    margin-left: 12px;
    font-weight: 400;
    font-size: ${(props) => props.theme.fontSizes.body.small};
    color: ${(props) => props.theme.colors.caption};
  }

  div.delete {
    color: ${(props) => props.theme.colors.caption};

    svg {
      fill: ${(props) => props.theme.colors.icon};
      width: 25px;
      height: 25px;

      :hover {
        cursor: pointer;
        fill: crimson;
      }
    }
  }

  margin-bottom: 16px;
`;
