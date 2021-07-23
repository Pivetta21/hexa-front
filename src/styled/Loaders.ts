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

export const PageLoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  flex-direction: column;
  height: 100%;
`;

export const PageLoaderCenter = styled.div`
  margin: auto 0;
`;

export const PageLoaderText = styled.p`
  font-family: cursive, serif;
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

export const PageLoader = styled.div`
  margin: 0 auto;
  border: 6px solid #f3f3f3;
  border-top: 6px solid #555;
  border-radius: 50%;
  width: 54px;
  height: 54px;
  z-index: 3;
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
