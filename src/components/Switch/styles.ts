import styled from 'styled-components';
import { darken } from 'polished';

export const SwitchContainer = styled.label`
  cursor: pointer;
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;

  input {
    width: 0;
    height: 0;
    opacity: 0;
  }

  input:checked + .switch-slider {
    border-color: ${(props) => props.theme.commonColors.magenta};
  }

  input:checked + .switch-slider:before {
    transform: translateX(23px);
    background: ${(props) => props.theme.commonColors.magenta};
  }

  input:checked ~ .switch-check {
    opacity: 1;
  }
`;

export const SwitchSlider = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 12px;
  background-color: ${(props) => darken(0.04, props.theme.colors.nav)};
  border: 3px solid ${(props) => props.theme.commonColors.lightBlack};

  &:before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    background-color: ${(props) => props.theme.commonColors.lightBlack};
    width: 14px;
    height: 14px;
    border-radius: 50%;
    transition: 0.4s;
  }
`;

export const SwitchCheck = styled.div`
  position: absolute;
  top: 2px;
  left: 3px;
  color: ${(props) => props.theme.commonColors.magenta};
  opacity: 0;
  transition: opacity 300ms;

  svg {
    width: 20px;
    height: 20px;
    fill: ${(props) => props.theme.commonColors.magenta};
  }
`;
