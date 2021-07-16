import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Header = styled.div`
  font-weight: 700;
  font-size: ${(props) => props.theme.fontSizes.heading.medium};
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacings.xSmall};
`;

export const HeaderCaption = styled.h1`
  font-weight: 400;
  font-size: ${(props) => props.theme.fontSizes.body.medium};
  color: ${(props) => props.theme.colors.caption};
  margin-bottom: ${(props) => props.theme.spacings.medium};
`;

export const InternalLink = styled(NavLink)`
  font-weight: 400;
  font-size: ${(props) => props.theme.fontSizes.body.medium};
  color: ${(props) => props.theme.colors.text};
  margin-right: ${(props) => props.theme.spacings.medium};

  &.active {
    color: ${(props) => props.theme.commonColors.magenta};
    padding-bottom: 2px;
    border-bottom: 2px solid ${(props) => props.theme.commonColors.magenta};
  }
`;

export const ContainerHeader = styled.h1`
  font-weight: 600;
  font-size: ${(props) => props.theme.fontSizes.body.medium};
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacings.xSmall};
`;

export const ContainerCaption = styled.p`
  font-weight: 400;
  font-size: ${(props) => props.theme.fontSizes.body.normal};
  color: ${(props) => props.theme.colors.caption};
  margin-bottom: ${(props) => props.theme.spacings.normal};
`;
