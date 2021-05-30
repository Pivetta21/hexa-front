import { H1, Title } from './styles/TextStyles';

const List: React.FC = () => {
  const list = [1, 2, 3, 4];

  return (
    <>
      <Title>Lista</Title>
      {list.map((element, index) => (
        <H1 key={index}>{element}</H1>
      ))}
    </>
  );
};

export default List;
