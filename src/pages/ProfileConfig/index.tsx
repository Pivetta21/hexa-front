import { Route, Switch } from 'react-router-dom';
import { Section, SectionLinks } from 'src/styled/Blocks';
import { Header, HeaderCaption, SectionLink } from 'src/styled/Texts';
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

        <SectionLinks>
          <SectionLink to="/profile/config" activeClassName="active" exact>
            Editar Perfil
          </SectionLink>
          <SectionLink
            to="/profile/config/preferences"
            activeClassName="active"
          >
            Preferências
          </SectionLink>
        </SectionLinks>

        <Switch key="profile">
          <Route path="/profile/config" exact>
            <EditProfile />
          </Route>
          <Route path="/profile/config/preferences">
            <PreferencesProfile />
          </Route>
        </Switch>
      </Section>
    </main>
  );
};

export default ProfileConfig;
