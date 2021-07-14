import styled from 'styled-components';

export const OverlayContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(24, 24, 24, 0.45);
  backdrop-filter: blur(4px);
`;

export const Overlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  overflow: scroll;
  overflow-x: hidden;
  scrollbar-color: transparent transparent;
  scrollbar-width: 0;

  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: transparent;
  }
`;

export const OverlayClose = styled.div`
  svg {
    filter: drop-shadow(0px 0.72px 2.88px rgba(0, 0, 0, 0.35));
    fill: ${(props) => props.theme.colors.icon};
    height: 40px;
    width: 40px;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const OverlayDiv = styled.div`
  width: fit-content;
  background-color: ${(props) => props.theme.colors.nav};
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
  padding: 20px 24px;
  border-radius: 6px;
`;
