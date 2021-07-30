import { Fragment, useState, useEffect } from 'react';
import { useParams, Switch, Route } from 'react-router-dom';

import { findChannel } from 'src/services/channel.service';

import { ChannelI } from 'src/models/Channel.model';
import { ServiceResponse } from 'src/models/ServiceResponse.model';

import Loading from 'src/components/Loading';

import ChannelDisplay from './ChannelDisplay';
import { ContentBlock, InternalLinksContainer } from 'src/styled/Blocks';
import { InternalLink } from 'src/styled/Texts';

import ChannelHome from './ChannelHome';

interface Props {}

const Channel: React.FC<Props> = () => {
  const { id } = useParams() as any;

  const [isLoading, setIsLoading] = useState(true);
  const [channelResponse, setChannelResponse] = useState(
    {} as ServiceResponse<ChannelI>,
  );

  function resetState() {
    setChannelResponse({} as ServiceResponse<ChannelI>);
    setIsLoading(true);
  }

  async function fetchChannel() {
    const serviceResponse = await findChannel(id);

    setChannelResponse(serviceResponse);
    setIsLoading(false);
  }

  useEffect(() => {
    setTimeout(() => {
      fetchChannel();
    }, 500);

    return () => {
      resetState();
    };
  }, [id]);

  return (
    <Fragment>
      {!isLoading && channelResponse.data && (
        <Fragment>
          <ChannelDisplay channel={channelResponse.data} />

          <ContentBlock>
            <InternalLinksContainer>
              <InternalLink
                to={`/discover/channels/${channelResponse.data.id}`}
                activeClassName="active"
                exact
              >
                Início
              </InternalLink>
              <InternalLink
                to={`/discover/channels/${channelResponse.data.id}/about`}
                activeClassName="active"
                exact
              >
                Sobre
              </InternalLink>
            </InternalLinksContainer>

            <Switch key="channel">
              <Route
                path={`/discover/channels/${channelResponse.data.id}`}
                exact
              >
                <ChannelHome channelId={id} />
              </Route>
              <Route
                path={`/discover/channels/${channelResponse.data.id}/about`}
                exact
              >
                <div>Sobre e estatísticas deste canal!</div>
              </Route>
            </Switch>
          </ContentBlock>
        </Fragment>
      )}

      {isLoading && <Loading />}
    </Fragment>
  );
};

export default Channel;
