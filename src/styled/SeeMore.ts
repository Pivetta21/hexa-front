import styled from 'styled-components';
import { transparentize } from 'polished';

export const SeeMore = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 2px;
  border-radius: 1px;
  background-color: ${(props) => transparentize(0.4, props.theme.colors.icon)};
  margin: 24px 0;
  user-select: none;

  div.see-more {
    display: flex;
    align-items: center;
    position: relative;
    padding: 8px 16px;
    text-align: center;
    background-color: ${(props) => props.theme.colors.body};

    span {
      margin-right: 6px;
      color: ${(props) => props.theme.commonColors.magenta};
      font-size: ${(props) => props.theme.fontSizes.body.normal};
      font-weight: 400;
    }

    svg {
      fill: ${(props) => props.theme.commonColors.magenta};
      width: 16px;
      height: 16px;
    }

    &:hover {
      cursor: pointer;
    }
  }
`;
