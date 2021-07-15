import { transparentize } from 'polished';
import styled from 'styled-components';

export const LoginOverlayContainer = styled.div`
  > h1 {
    font-size: ${(props) => props.theme.fontSizes.body.medium};
    font-weight: 700;
    color: ${(props) => props.theme.commonColors.magenta};
    margin-bottom: 12px;
  }
`;

export const LoginNav = styled.div`
  display: flex;
  margin-bottom: 16px;
  position: relative;

  &::after {
    position: absolute;
    bottom: 0;
    z-index: 998;
    content: '';
    width: 100%;
    height: 1px;
    background-color: rgba(132, 132, 140, 0.2);
  }
`;

export const LoginNavLink = styled.div`
  z-index: 999;
  font-size: ${(props) => props.theme.fontSizes.body.normal};
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
  margin-left: 12px;

  &:first-child {
    margin-left: 0;
  }

  &:hover {
    cursor: pointer;
  }

  &.active {
    font-weight: 700;
    color: ${(props) => props.theme.commonColors.magenta};
    border-bottom: 2px solid ${(props) => props.theme.commonColors.magenta};
  }
`;

export const StepsHeader = styled.div`
  width: 320px;

  > h1 {
    margin-bottom: 10px;
    font-weight: 600;
    font-size: 1.15rem;
  }

  > p {
    font-size: 1rem;
    margin-bottom: 20px;
  }
`;

export const ButtonsStepTwo = styled.div`
  display: flex;
  flex-direction: column;

  button {
    width: 100%;

    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const LoginForm = styled.form`
  p.link {
    width: fit-content;
    color: ${(props) => props.theme.commonColors.magenta};

    &:hover {
      cursor: pointer;
    }
  }

  button {
    margin-top: 20px;
    width: 100%;
  }
`;

export const LoginFormError = styled.div`
  position: relative;
  width: 100%;
  background-color: ${(props) => transparentize(0.92, props.theme.colors.text)};
  padding: 20px;
  margin-top: 20px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 16px;
  color: ${(props) => props.theme.colors.text};
  font-weight: 600;

  &::before {
    content: '> ';
    color: ${(props) => props.theme.commonColors.red};
    width: 30px;
    height: 30px;
  }
`;
