import styled from 'styled-components';

import { transparentize } from 'polished';

export const ChannelListSk = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  row-gap: 16px;
  column-gap: 16px;
`;

export const ChannelContainerSk = styled.div`
  display: flex;
  width: 100%;
  height: 180px;
  padding: 16px;
  background-color: ${(props) => transparentize(0.92, props.theme.colors.text)};
  border-radius: 8px;

  pointer-events: none;
`;

export const ChannelHeaderSk = styled.div`
  display: flex;
  flex-direction: column;
`;
