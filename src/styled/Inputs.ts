import styled, { css } from 'styled-components';

import { invert } from 'polished';

const inputReset = css`
  background: none;
  border: none;
  outline: none;
`;

export const FormContainer = styled.form`
  p {
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
    color: ${(props) => props.theme.colors.text};
    font-size: 16px;
    font-weight: 400;
    width: 320px;
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
