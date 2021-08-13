import { ChannelI } from 'src/models/Channel.model';
import formatDate from 'src/helpers/formatDate';
import { StatsCards } from 'src/styled/StatsCards';
import {
  ChannelAboutContainer,
  ChannelAboutDescription,
  ChannelAboutStats,
} from './styles';
import { useEffect, useState } from 'react';
import { findChannelFollowers } from 'src/services/channelUser.service';
import { findAllCoursesByChannelId } from 'src/services/course.service';

interface Props {
  channel: ChannelI;
}

const ChannelAbout: React.FC<Props> = ({ channel }) => {
  const [followers, setFollowers] = useState(0);
  const [coursesCount, setCoursesCount] = useState(0);

  async function fetchStats() {
    const followersResponse = await findChannelFollowers(channel.id);

    if (!followersResponse.errorResponse && followersResponse.data) {
      setFollowers(followersResponse.data.length);
    }

    const coursesCountResponse = await findAllCoursesByChannelId(channel.id);

    if (!coursesCountResponse.errorResponse && coursesCountResponse.data) {
      setCoursesCount(coursesCountResponse.data.length);
    }
  }

  useEffect(() => {
    fetchStats();

    return () => {
      setFollowers(0);
    };
  }, []);

  return (
    <ChannelAboutContainer>
      <ChannelAboutDescription>
        <h1>Descrição</h1>
        <p>
          {channel.description
            ? channel.description
            : 'Esse canal ainda não definiu uma descrição.'}
        </p>
        <span>Canal criado em {formatDate('pt-br', channel.created_at)}</span>
      </ChannelAboutDescription>

      <ChannelAboutStats>
        <h1>Estatísticas</h1>
        <StatsCards>
          <div>
            <p>Seguidores</p>
            <span>{followers < 10 ? `0${followers}` : followers}</span>
          </div>
          <div>
            <p>Cursos</p>
            <span>{coursesCount < 10 ? `0${coursesCount}` : coursesCount}</span>
          </div>
        </StatsCards>
      </ChannelAboutStats>
    </ChannelAboutContainer>
  );
};

export default ChannelAbout;
