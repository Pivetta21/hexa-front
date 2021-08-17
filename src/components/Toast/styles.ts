import styled from 'styled-components';

export const ToastContainer = styled.div<{ backgroundColor: string }>`
  position: fixed;
  bottom: 12px;
  right: 12px;
  max-width: 340px;
  background-color: ${(props) => props.backgroundColor};

  :hover {
    cursor: pointer;
  }
  box-shadow: ${(props) => props.theme.shadows.big};
  z-index: 99;
`;

export const ToastSection = styled.div`
  padding: 8px 20px;
`;

export const ToastHeader = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;

  svg {
    position: relative;
    right: -18px;
    top: -5px;
    width: 24px;
    height: 24px;
    fill: ${(props) => props.theme.colors.text};
  }

  h1 {
    font-size: 1rem;
    font-weight: 700;
  }
`;

export const TostDescription = styled.div``;

export const TostTime = styled.div<{ velocity: number }>`
  background-color: rgb(233, 233, 233);

  > div {
    height: 6px;
    background-color: rgb(62, 122, 235);
    animation: progressIn ${(props) => props.velocity + 'ms'} ease-in-out;
  }

  @keyframes progressIn {
    0% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
  }
`;
