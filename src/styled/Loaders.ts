import styled from 'styled-components';

export const ButtonLoader = styled.div`
  border: 3px solid #f3f3f3;
  border-top: 3px solid #555;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
