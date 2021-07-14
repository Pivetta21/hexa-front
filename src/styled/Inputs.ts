import styled, { css } from 'styled-components';

import { invert, transparentize } from 'polished';

const inputReset = css`
  background: none;
  border: none;
  outline: none;
`;

export const FormContainer = styled.form`
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

export const OutlineInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  label {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: -2px;
  }

  input {
    ${inputReset}
    min-width: 320px;
    max-width: 368px;
    color: ${(props) => props.theme.colors.text};
    font-size: 16px;
    font-weight: 400;
    padding: 8px 0;
    border-bottom: 2px solid ${(props) => invert(props.theme.colors.body)};

    ::-ms-reveal {
      display: none;
    }

    ::placeholder {
      color: ${(props) => props.theme.colors.caption};
    }
  }
`;

export const FormError = styled.div`
  position: relative;
  width: 100%;
  background-color: ${(props) => transparentize(0.92, props.theme.colors.text)};
  padding: 20px;
  margin-top: 16px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 16px;
  color: ${(props) => props.theme.colors.text};
  font-weight: 600;

  &::before {
    content: '> ';
    color: #e61919;
    width: 30px;
    height: 30px;
  }
`;

export const InputError = styled.div`
  font-size: 14px;
  position: relative;
  color: #e61919;
  margin-top: -8px;
  margin-bottom: 16px;

  &::before {
    content: '* ';
  }
`;
