import styled, { css } from 'styled-components';

import { invert, transparentize } from 'polished';

const input = css`
  background: none;
  border: none;
  outline: none;
  min-width: 320px;
  max-width: 368px;
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontSizes.body.normal};
  font-weight: 400;

  ::-ms-reveal {
    display: none;
  }

  ::placeholder {
    color: ${(props) => props.theme.colors.caption};
  }
`;

const inputError = css`
  position: relative;
  color: ${(props) => props.theme.commonColors.red};
  margin-bottom: ${(props) => props.theme.spacings.default};

  &::before {
    content: '* ';
  }
`;

export const DefaultInput = styled.div`
  margin-bottom: ${(props) => props.theme.spacings.default};

  label {
    font-size: ${(props) => props.theme.fontSizes.body.normal};
    font-weight: 700;
  }

  input {
    ${input}
    background-color: ${(props) =>
      transparentize(0.92, props.theme.colors.text)};
    padding: 10px 12px;
    border-radius: 6px;
    margin-top: 8px;
  }
`;

export const DefaultInputError = styled.div`
  ${inputError}

  font-size: ${(props) => props.theme.fontSizes.body.normal};
  margin-top: 6px;
`;

export const OutlineInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${(props) => props.theme.spacings.default};

  label {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: -2px;
  }

  input {
    ${input}
    padding: 8px 0;
    border-bottom: 2px solid ${(props) => invert(props.theme.colors.body)};
  }
`;

export const OutlineInputError = styled.div`
  ${inputError}

  font-size: 14px;
  margin-top: -8px;
`;
