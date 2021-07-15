import styled from 'styled-components';

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 365px;
  margin: 0 auto;
`;

export const SectionLinks = styled.div`
  margin-bottom: ${(props) => props.theme.spacings.small};
`;

export const FormContainer = styled.form`
  margin: ${(props) => props.theme.spacings.normal} 0;
`;

export const FormButtonsRow = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin: ${(props) => props.theme.spacings.medium} 0;

  button:last-child {
    margin-right: 12px;
  }
`;
