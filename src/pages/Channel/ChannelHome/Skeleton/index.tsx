import { ListBlock } from 'src/styled/Blocks';
import {
  ChannelHomeContainerSk,
  ChannelHomeListSk,
  ChannelHomeTitleSk,
} from './styles';

interface Props {}

const ChannelHomeSkeleton: React.FC<Props> = () => {
  const courses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <ChannelHomeContainerSk>
      <ChannelHomeTitleSk>Cursos Publicados</ChannelHomeTitleSk>

      <ListBlock>
        <ChannelHomeListSk>
          {courses.map((course) => {
            return <span key={course}></span>;
          })}
        </ChannelHomeListSk>
      </ListBlock>
    </ChannelHomeContainerSk>
  );
};

export default ChannelHomeSkeleton;
