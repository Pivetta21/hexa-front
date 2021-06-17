import { Link } from 'react-router-dom';

import Monster404Error from 'src/assets/svg/illustrations/Monster404Error.svg';
import { NotFoundContainer } from './styles';

interface Props {}

const NotFound: React.FC<Props> = () => {
  return (
    <NotFoundContainer>
      <img src={Monster404Error} alt="No Found - 404" />
      <Link to="/">Voltar para o início!</Link>
    </NotFoundContainer>
  );
};

export default NotFound;
