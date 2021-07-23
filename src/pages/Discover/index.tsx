import { Route, Switch } from 'react-router-dom';
import { InternalLinksContainer } from 'src/styled/Blocks';
import { Header, InternalLink } from 'src/styled/Texts';
import DiscoverCourses from './DiscoverCourses';
import DiscoverChannels from './DiscoverChannels';

interface Props {}

const Discover: React.FC<Props> = () => {
  return (
    <div className="main-padding h-100">
      <Header>Descobrir</Header>
      <InternalLinksContainer>
        <InternalLink to="/discover" activeClassName="active" exact>
          Cursos
        </InternalLink>
        <InternalLink to="/discover/channels" activeClassName="active" exact>
          Canais
        </InternalLink>
      </InternalLinksContainer>
      <Switch key="discover">
        <Route path="/discover" exact>
          <DiscoverCourses />
        </Route>
        <Route path="/discover/channels" exact>
          <DiscoverChannels />
        </Route>
      </Switch>
    </div>
  );
};

export default Discover;
