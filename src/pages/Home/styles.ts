import styled from 'styled-components';
import { transparentize } from 'polished';

export const NoCourseCTA = styled.div`
  height: 284px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1.4rem;
  line-height: 2.8rem;
  letter-spacing: 0.5px;
  font-weight: 400;
  margin-top: 24px;
  background-color: ${(props) => transparentize(0.92, props.theme.colors.text)};
`;
