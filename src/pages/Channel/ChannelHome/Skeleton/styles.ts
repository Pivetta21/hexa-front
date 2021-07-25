import styled from 'styled-components';
import { transparentize } from 'polished';

export const ChannelHomeContainerSk = styled.div``;

export const ChannelHomeTitleSk = styled.div`
  font-weight: 600;
  font-size: ${(props) => props.theme.fontSizes.body.medium};
  margin-top: 24px;
  margin-bottom: 16px;
`;

export const ChannelHomeListSk = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  row-gap: 12px;
  column-gap: 12px;
  span {
    height: 180px;
    padding: 16px;
    background-color: ${(props) =>
      transparentize(0.92, props.theme.colors.text)};
  }
`;
