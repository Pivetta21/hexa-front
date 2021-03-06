import styled, { css } from 'styled-components';

const marginTop = css`
  margin-top: ${(props) => props.theme.spacings.normal};
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;
  margin: 0 auto;
`;

export const InternalLinksContainer = styled.div`
  margin-bottom: ${(props) => props.theme.spacings.small};
`;

export const FormContainer = styled.form`
  ${marginTop}

  p.link {
    width: fit-content;
    color: ${(props) => props.theme.commonColors.magenta};
    margin-bottom: ${(props) => props.theme.spacings.normal};

    &:hover {
      cursor: pointer;
    }
  }
`;

export const OptionsContainer = styled.div`
  ${marginTop}
`;

export const InlineOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: ${(props) => props.theme.spacings.normal};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ImageUploadContainer = styled.div`
  margin-bottom: ${(props) => props.theme.spacings.default};

  input {
    display: none;
  }
`;

export const ContentBlock = styled.div`
  padding: ${(props) => props.theme.spacings.medium};
  padding-top: 0px;

  @media (max-width: ${(props) => props.theme.breakpoints.nav.tablet}) {
    padding: ${(props) => props.theme.spacings.normal};
    padding-top: 8px;
  }
`;

export const ListBlock = styled.div`
  margin-top: 24px;
  margin-right: 0px;
  margin-bottom: 0px;
  margin-left: 0px;
`;
