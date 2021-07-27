import styled, { css } from 'styled-components';

import { invert, transparentize, lighten } from 'polished';

const input = css`
  background: none;
  border: none;
  outline: none;
  min-width: 320px;
  font-family: inherit;
  font-size: ${(props) => props.theme.fontSizes.body.normal};
  color: ${(props) => props.theme.colors.text};
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

export const InputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  column-gap: 16px;

  input {
    width: 100%;
    min-width: unset !important;
  }
`;

export const DefaultSelect = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${(props) => props.theme.spacings.default};

  label {
    font-size: ${(props) => props.theme.fontSizes.body.normal};
    font-weight: 700;
  }

  select {
    margin-top: 8px;
    border: none;
    padding: 10px 12px;
    border-radius: 6px;
    font-family: inherit;
    color: ${(props) => props.theme.colors.text};
    font-size: ${(props) => props.theme.fontSizes.body.normal};
    font-weight: 400;
    background-color: ${(props) =>
      lighten(0.07, invert(props.theme.colors.text))};

    option {
      padding: 0;
      border: none;
    }
  }
`;

export const DefaultCheckbox = styled.label`
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  font-family: inherit;
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.theme.fontSizes.body.normal};
  margin-bottom: ${(props) => props.theme.spacings.default};
  font-weight: 400;

  cursor: default;

  input {
    cursor: pointer;
    margin-right: 12px;
  }
`;

export const DefaultInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${(props) => props.theme.spacings.default};

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0 !important;
  }

  input[type='number'] {
    -moz-appearance: textfield !important;
  }

  label {
    font-size: ${(props) => props.theme.fontSizes.body.normal};
    font-weight: 700;
  }

  input,
  textarea {
    ${input}
    background-color: ${(props) =>
      lighten(0.07, invert(props.theme.colors.text))};
    padding: 10px 12px;
    border-radius: 6px;
    margin-top: 8px;
  }

  textarea {
    resize: none;
    height: 140px;
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

export const ImageUploadInput = styled.div`
  img {
    background-color: ${(props) =>
      transparentize(0.92, props.theme.colors.text)};
  }

  &.stack {
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      object-fit: cover;
      object-position: center;
    }

    button {
      width: 60%;
    }
  }

  &.inline {
    display: flex;
    flex-direction: column;

    img {
      height: 160px;
      object-fit: cover;
      object-position: center;
      border-radius: 12px;
    }

    button {
      margin-top: ${(props) => props.theme.spacings.small};
    }
  }
`;

export const ServiceError = styled.div`
  position: relative;
  width: 100%;
  background-color: ${(props) => transparentize(0.92, props.theme.colors.text)};
  padding: 20px;
  margin: 16px 0;
  border-radius: 8px;
  font-size: 14px;
  color: ${(props) => props.theme.colors.text};
  font-weight: 600;

  &::before {
    content: '> ';
    color: ${(props) => props.theme.commonColors.red};
    width: 30px;
    height: 30px;
  }
`;
