import { Header } from './styles';

interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <div>
      <Header>Home Page</Header>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit ea natus
        quae at rem, asperiores sapiente distinctio beatae nobis molestiae
        repellendus, praesentium adipisci facilis. Soluta magnam iure hic porro
        ullam!
      </p>
    </div>
  );
};

export default Home;
