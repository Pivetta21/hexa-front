import { ChannelHomeContainerSk, ChannelHomeSk } from './styles';

interface Props {}

const ChannelHomeSkeleton: React.FC<Props> = () => {
  const courses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <ChannelHomeContainerSk>
      <h1>Cursos Publicados</h1>
      <ChannelHomeSk>
        {courses.map((course) => {
          return <span key={course}></span>;
        })}
      </ChannelHomeSk>
    </ChannelHomeContainerSk>
  );
};

export default ChannelHomeSkeleton;
