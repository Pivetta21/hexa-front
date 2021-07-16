import { darken } from 'polished';
import styled, { css } from 'styled-components';

const resetButton = css`
  margin: 0;
  padding: 0;
  border-radius: 0;
  border: none;
  width: auto;
  overflow: hidden;
  background: transparent;
  outline: none;
  color: inherit;
  font: inherit;
  text-transform: none;
  text-align: inherit;
  line-height: normal;
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  -webkit-appearance: none;

  &:focus:not(:focus-visible) {
    outline: none;
  }

  &:focus:not(:-moz-focusring) {
    outline: none;
  }

  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
`;

const btn = css`
  ${resetButton}

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  height: 38px;
  border-radius: 4px;
  font-size: ${(props) => props.theme.fontSizes.body.normal};
  font-weight: 600;
  color: ${(props) => props.theme.commonColors.white};

  &:hover:not(:disabled) {
    cursor: pointer;
  }

  &:focus {
    outline: none;
    box-shadow: var(--focus-shadow);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ButtonPrimary = styled.button`
  ${btn}
  background-color: ${(props) => props.theme.commonColors.magenta};

  &:hover:not(:disabled) {
    background-color: ${(props) =>
      darken(0.04, props.theme.commonColors.magenta)};
  }
`;

export const ButtonSecondary = styled.button`
  ${btn}
  background-color: ${(props) => props.theme.commonColors.darkGray};

  &:hover:not(:disabled) {
    background-color: ${(props) =>
      darken(0.02, props.theme.commonColors.darkGray)};
  }
`;

export const OutlineButton = styled.button`
  ${btn}

  background-color: transparent;
  border: 2px solid;
  border-color: ${(props) => props.theme.colors.text};
  color: ${(props) => props.theme.colors.text};

  &:hover:not(:disabled) {
    opacity: 0.8;
  }
`;

export const ButtonsRowContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-top: ${(props) => props.theme.spacings.medium};

  button {
    margin-right: 12px;

    &:first-child {
      margin-right: 0;
    }
  }
`;

export const ButtonsColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: ${(props) => props.theme.spacings.medium};

  button {
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;
