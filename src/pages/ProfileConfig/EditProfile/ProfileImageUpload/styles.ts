import styled from 'styled-components';

export const ImageUploadContainer = styled.div`
  margin-bottom: ${(props) => props.theme.spacings.default};

  input {
    display: none;
  }

  .stack {
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

  .inline {
    display: flex;
  }
`;
