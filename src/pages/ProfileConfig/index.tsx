import { Redirect, Route, Switch } from 'react-router-dom';
import { Section, InternalLinksContainer } from 'src/styled/Blocks';
import { Header, HeaderCaption, InternalLink } from 'src/styled/Texts';
import EditProfile from './EditProfile';
import PreferencesProfile from './PreferencesProfile';

interface Props {}

const ProfileConfig: React.FC<Props> = () => {
  return (
    <main className="main-padding">
      <Section>
        <Header>Configurações</Header>
        <HeaderCaption>
          Aqui você pode editar seu perfil e alterar suas preferências.
        </HeaderCaption>

        <InternalLinksContainer>
          <InternalLink to="/profile/config" activeClassName="active" exact>
            Editar Perfil
          </InternalLink>
          <InternalLink
            to="/profile/config/preferences"
            activeClassName="active"
          >
            Preferências
          </InternalLink>
        </InternalLinksContainer>

        <Switch key="profile">
          <Route path="/profile/config" exact>
            <EditProfile />
          </Route>
          <Route path="/profile/config/preferences" exact>
            <PreferencesProfile />
          </Route>
          <Route path="/profile/config/*" exact>
            <Redirect to="/oops" />
          </Route>
        </Switch>
      </Section>
    </main>
  );
};

export default ProfileConfig;
